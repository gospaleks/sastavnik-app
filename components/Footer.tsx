export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 text-center">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sastavnik. Sva prava zadržana.
      </p>
    </footer>
  );
}
