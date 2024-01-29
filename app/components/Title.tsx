export const Title = ({ title, desc }: { title: string, desc: string }) => {
  return (
    <div>
      <h1 className=" text-Marineblue text-3xl font-bold">{title}</h1>
      <p className=" text-Coolgray mt-1">{desc}</p>
    </div>
  );
};