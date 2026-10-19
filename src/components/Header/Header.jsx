import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from './LogoutBtn'

function Header() {
  const navigate = useNavigate();
  const authstatus = useSelector(state => state.status)

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active:authstatus
    },
    {
      name: "Login",
      slug: "/login",
      active:!authstatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active:!authstatus
    },
  ];

  return (
    <div className="bg-blue-300 py-2">
      <div className="font-bold text-2xl flex justify-center items-center">
        Weather Forecast
        </div>
        <div className="flex gap-2 justify-end px-3">
          {navItems.map((items) => items.active ? (
            <button
              className="border-black border-2 px-2 py-1 rounded-lg hover:bg-amber-100"
              onClick={() => navigate(items.slug)}
              key={items.name}
            >
              {items.name}
            </button>
          ): null)}

          <div> {authstatus && <div><LogoutBtn /></div> } </div>
        
      </div>
     
    </div>
  );
}

export default Header;
