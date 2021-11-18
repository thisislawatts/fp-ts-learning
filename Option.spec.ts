import { pipe } from "fp-ts/function";
import { fromNullable, map } from "fp-ts/lib/Option";

describe("Option", () => {
  describe("fromNullable", () => {
    it("wraps a null value in a container with _tag property", () => {
      expect(pipe(null, fromNullable)).toStrictEqual({
        _tag: "None",
      });
    });

    it("wraps a non null value in a container with _tag and _value property", () => {
      expect(pipe(1, fromNullable)).toStrictEqual({
        _tag: "Some",
        value: 1,
      });
    });
  });

  describe("map", () => {
    it("applies transform", () => {
      expect(
        pipe(
          1,
          fromNullable,
          map((v) => v * 2)
        )
      ).toStrictEqual({
        _tag: "Some",
        value: 2,
      });
    });
  });
});
