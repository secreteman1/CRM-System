import "./Button.sass";
export default function Button({ title, value }) {
  return (
    <>
      <button className="no-background-picked">
        {title} ({value})
      </button>
    </>
  );
}
