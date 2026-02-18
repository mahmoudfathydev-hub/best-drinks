import About from "@/components/About";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import menuData from "@/data/data.json";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <div className="h-screen">
        {menuData.map((item, index) => (
          <Menu key={index} item={item} />
        ))}
      </div>
    </>
  );
}
