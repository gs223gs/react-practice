import { Button } from "@/components/ui/button";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Todo App
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/todos">
                <Button variant="ghost">Todos</Button>
              </Link>
              <Button variant="ghost" onClick={signOut}>
                ログアウト
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost">ログイン</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}; 