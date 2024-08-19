function TestComponent() {
  const list = [1, 2, 3, 4, 5];
  const label = "this is the test component";
  return (
    <>
      <h1>{label}</h1>
      <ul>
        {list.map((number) => (
          <li>{number}</li>
        ))}
      </ul>
    </>
  );
}

export default TestComponent;
