import { LoginView } from "./views/loginView.js";
import { DashboardView } from "./views/dashboardView.js";

export const AppSPA = {
    init() {
        // Run router when loading the app
        this.router();
    },

    router() {
        const container = document.getElementById("app");
        const user = this.getUserSession();

        // Route control based on local session (Route Guards)
        if (!user) {
            container.innerHTML = LoginView.render();
            LoginView.init();
        } else {
            container.innerHTML = DashboardView.render();
            DashboardView.init();
        }
    },

    setSession(user) {
        localStorage.setItem("riwiflow_session", JSON.stringify(user));
        this.router(); // Instant SPA transition without reloading
    },

    getUserSession() {
        const storage = localStorage.getItem("riwiflow_session");
        if (!storage) return null;

        try {
            return JSON.parse(storage);
        } catch (error) {
            localStorage.removeItem("riwiflow_session");
            return null;
        }
    },

    clearSession() {
        localStorage.removeItem("riwiflow_session");
        this.router(); // Clean return to login
    },

    showNotification(message, type = "info") {
        const wrapper = document.getElementById("modal-wrapper") || document.body;
        const bgColor = type === "error" ? "bg-error/10" : "bg-primary/10";
        const textColor = type === "error" ? "text-error" : "text-primary";
        const buttonBg = type === "error" ? "bg-error" : "bg-primary";

        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-md";
        modal.innerHTML = `
            <div class="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl w-full max-w-[440px] space-y-md">
                <div class="${bgColor} p-md rounded-lg flex items-center gap-md">
                    <span class="material-symbols-outlined ${textColor}">${type === "error" ? "error" : "check_circle"}</span>
                    <p class="font-body-md text-body-md ${textColor}">${message}</p>
                </div>
                <button id="notify-close" class="w-full ${buttonBg} text-on-primary p-2 rounded font-label-md">Accept</button>
            </div>
        `;
        wrapper.appendChild(modal);
        document.getElementById("notify-close").addEventListener("click", () => modal.remove());
    },

    showConfirm(message, onConfirm) {
        const wrapper = document.getElementById("modal-wrapper") || document.body;
        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-md";
        modal.innerHTML = `
            <div class="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl w-full max-w-[440px] space-y-md">
                <p class="font-body-md text-body-md text-on-surface">${message}</p>
                <div class="flex gap-2">
                    <button id="confirm-cancel" class="w-1/2 border border-outline-variant p-2 rounded font-label-md">Cancel</button>
                    <button id="confirm-ok" class="w-1/2 bg-primary text-on-primary p-2 rounded font-label-md">Confirm</button>
                </div>
            </div>
        `;
        wrapper.appendChild(modal);
        document.getElementById("confirm-cancel").addEventListener("click", () => modal.remove());
        document.getElementById("confirm-ok").addEventListener("click", () => {
            modal.remove();
            onConfirm();
        });
    }
};

// Start the SPA automatically
document.addEventListener("DOMContentLoaded", () => AppSPA.init());