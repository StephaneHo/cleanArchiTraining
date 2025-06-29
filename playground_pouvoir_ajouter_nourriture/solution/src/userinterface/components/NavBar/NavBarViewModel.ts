import { useNavigate } from "react-router-dom";

export function NavBarViewModel() {
  const navigate = useNavigate();
  const onNavigate = (path: string) => {
    navigate(path);
  };
  return {
    onNavigate,
  };
}
