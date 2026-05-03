"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    private handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl text-red-500">error</span>
                        </div>
                        <h1 className="text-2xl font-bold text-primary mb-4">
                            Algo salió mal
                        </h1>
                        <p className="text-text-light/70 mb-6">
                            Lo sentimos, ocurrió un error inesperado. Por favor intenta de nuevo.
                        </p>
                        <button
                            onClick={this.handleReload}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Recargar página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}