import { pipe } from "fp-ts/function";
import { ask, chain, Reader } from "fp-ts/Reader";

describe("Reader", () => {
  it("load dependencies in reader", () => {
    // Arrange
    interface Dependencies {
      i18n: {
        true: string;
        false: string;
      };
    }

    const f =
      (b: boolean): Reader<Dependencies, string> =>
      (deps) =>
        b ? deps.i18n.true : deps.i18n.false;

    const g = (n: number): Reader<Dependencies, string> => f(n > 2);

    const h = (s: string): Reader<Dependencies, string> => g(s.length + 1);

    const deps: Dependencies = {
      i18n: {
        true: "translated value",
        false: "original string",
      },
    };

    // Act/Assert
    expect(h("foo")(deps)).toBe("translated value");
  });

  it("inject dependencies into intermediate reader `g`", () => {
    interface Dependencies {
      i18n: {
        true: string;
        false: string;
      };
      lowerBound: number;
    }

    const f =
      (b: boolean): Reader<Dependencies, string> =>
      (deps) =>
        b ? deps.i18n.true : deps.i18n.false;

    const g = (n: number): Reader<Dependencies, string> =>
      pipe(
        ask<Dependencies>(),
        chain(({ lowerBound }) => f(n > lowerBound))
      );

    const h = (s: string): Reader<Dependencies, string> => g(s.length + 1);

    const deps: Dependencies = {
      i18n: {
        true: "translated value",
        false: "original string",
      },
      lowerBound: 200,
    };

    expect(h("fo")(deps)).toBe("original string");
  });
});
