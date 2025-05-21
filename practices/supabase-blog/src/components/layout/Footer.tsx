export const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Todo App. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              利用規約
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              プライバシーポリシー
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}; 