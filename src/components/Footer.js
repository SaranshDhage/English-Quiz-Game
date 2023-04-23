export default function Footer() {
    return (
      <>
        <footer className="flex items-center justify-between flex-wrap w-screen text-white bg-red-800 p-2">
          <span className="font-semibold w-full text-lg text-center tracking-tight">
            Made by
            <a
              href="https://github.com/HANS-2002"
              target="_blank"
              rel="noreferrer"
              className="text-lime-400"
            >
              {" Saransh "}
            </a>
          </span>
        </footer>
      </>
    );
  }
  