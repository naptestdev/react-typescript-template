import React, { FC, useState } from "react";

const Counter: FC = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Increase: {count}</button>;
};

export default Counter;
