export function Footer() {
    return (
        <div className="text-zinc-950 dark:text-zinc-200 text-center border-t border-gray-600 p-4">
            <p className="text-sm">© 2024 CoinDash. Todos os direitos reservados.</p>
            <div className="mt-2">
                <a href="/privacy" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 hover:dark:text-purple-600">Política de Privacidade</a>
                <span className="mx-2">|</span>
                <a href="/terms" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 hover:dark:text-purple-600">Termos de Serviço</a>
            </div>
        </div>
    );
}
