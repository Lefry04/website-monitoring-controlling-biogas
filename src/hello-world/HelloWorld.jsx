export default function HelloWorld() {
  return (
    <div>
      <Header />
      <Paragraph />
    </div>
  );
} 

function Header() {
  return (
      <h1>Hello, World!</h1>
  )
}

function Paragraph() {
  return (
      <p>Lorem ipsum dolor sit.</p>
  )
}