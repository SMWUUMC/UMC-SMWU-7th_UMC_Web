import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Auth 상태 타입 정의
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    email: string;
}

// 로그인 함수의 파라미터 타입 정의
interface LoginParams {
    email: string;
    password: string;
}

// AuthContext 타입 정의
interface AuthContextProps {
    auth: AuthState;
    login: (params: LoginParams) => Promise<void>;
    logout: () => void;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// useAuth 커스텀 훅
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// AuthProvider 컴포넌트의 Props 타입 정의
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        email: localStorage.getItem("email") || "",
    });

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (auth.accessToken) {
                const isValid = await validateAccessToken(auth.accessToken);
                if (!isValid) {
                    logout();
                }
            }
        };
        checkTokenValidity();
    }, [auth.accessToken]);

    const validateAccessToken = async (accessToken: string): Promise<boolean> => {
        try {
            const response = await axios.get("http://localhost:3000/user/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return response.status === 200;
        } catch (error) {
            console.error("토큰 검증 실패:", error);
            return false;
        }
    };

    const login = async ({ email, password }: LoginParams): Promise<void> => {
        try {
            const response = await axios.post("http://localhost:3000/auth/login", { email, password });
            const { accessToken, refreshToken } = response.data;

            if (!accessToken || !refreshToken) {
                throw new Error("토큰이 반환되지 않았습니다.");
            }

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("email", email);

            setAuth({ accessToken, refreshToken, email });
        } catch (error: any) {
            console.error("로그인 실패:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.");
        }
    };

    const logout = (): void => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        setAuth({
            accessToken: null,
            refreshToken: null,
            email: "",
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
