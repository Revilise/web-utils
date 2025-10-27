import { describe, it, expect } from "vitest";
import { useBEM } from "./index";

describe("useBEM", () => {
  const { bem } = useBEM("block");

  it("Базовый класс без модификаторов", () => {
    expect(bem("")).toBe("block");
    expect(bem("header")).toBe("block__header");
  });

  it("Элемент с модификатором", () => {
    expect(bem("header", { extraCN: { active: true, disabled: false } }))
       .toBe("block__header block__header--active");
  });

  it("Утилиты в виде строки", () => {
    expect(bem("footer", { utilCN: "u-clearfix" }))
       .toBe("block__footer u-clearfix");
  });

  it("Утилиты в виде массива", () => {
    expect(bem("sidebar", { utilCN: ["u-flex", false, "u-padding"] }))
       .toBe("block__sidebar u-flex u-padding");
  });

  it("Использование модификаторов и утилиит вместе", () => {
    expect(bem("item", {
      extraCN: { selected: true },
      utilCN: ["u-mt", "", "u-mb"]
    })).toBe("block__item block__item--selected u-mt u-mb");
  });

  it("Модификаторы - пустой объект", () => {
    expect(bem("menu", { extraCN: {} })).toBe("block__menu");
  });

  it("Модифиакторы - объект со всеми ключами false", () => {
    expect(bem("header", { extraCN: { active: false, selected: false } }))
       .toBe("block__header");
  });

  it("Блок с пустой утилитой (пустой строкой)", () => {
    expect(bem("", { utilCN: "" }))
       .toBe("block");
  });
});
