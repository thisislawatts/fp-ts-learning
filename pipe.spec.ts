import { pipe } from "fp-ts/lib/function";

describe("pipe", () => {
  it("passes the first param to the second param", () => {
    // Arrange
    const mock = jest.fn();
    // Act
    const result = pipe("a", mock);
    // Assert
    expect(mock).toBeCalledWith("a");
    expect(result).toBe(undefined);
  });

  it("passes the first param back as value", () => {
    expect(pipe("a")).toBe("a");
  });

  it("returns the value from a sequence of functions", () => {
    // Arrange
    const sum = (i: number) => i * 2;
    // Act
    const result = pipe(2, sum, sum);
    // Assert
    expect(result).toBe(8);
  });

  it("executes functions from 2nd param to last", () => {
    // Act
    const result = pipe(
      "a",
      (str: string) => str + "b",
      (str: string) => str + "c",
      (str: string) => str + "d",
      (str: string) => str + "e"
    );
    // Assert
    expect(result).toBe("abcde");
  });
});
