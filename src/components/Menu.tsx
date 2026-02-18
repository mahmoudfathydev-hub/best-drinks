import React from "react";

type MenuItem = {
  flavor: string;
  Can: string;
  images: string[];
  backgroundColor: string;
  description: string;
};

interface Props {
  item?: MenuItem;
}

function Menu({ item }: Props) {
  if (!item) return null;

  return (
    <div
      className="w-[50vw] h-full flex items-center justify-center"
      style={{ backgroundColor: item.backgroundColor }}
    >
      <div className="relative w-full h-full flex items-center justify-between px-16">
        <div className="max-w-md text-white">
          <h2 className="text-5xl font-bold mb-6">{item.flavor}</h2>
          <p className="text-lg leading-relaxed opacity-90">
            {item.description}
          </p>
        </div>

        <div className="relative w-[320px] h-[420px] flex items-center justify-center">
          <img
            src={item.Can.replace("public/", "/")}
            alt={item.flavor}
            className="relative z-10 w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Menu;
