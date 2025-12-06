export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-foreground">Stelani</p>
            <p className="text-sm text-muted-foreground">
              Bolsas artesanais em miçangas
            </p>
          </div>

          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>&copy; 2025 Stelani. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}