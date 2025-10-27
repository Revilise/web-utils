type bemOptions = {
  baseCN: string,
  extraCN?: Record<string, boolean>,
  utilCN?: string | Array<string | boolean>
}

export function useBEM(baseClass: string) {
  return {
    bem(blockCN: string, options: Omit<bemOptions, "baseCN"> = {}) {
      const className = [];
      const base = !blockCN ? baseClass : `${baseClass}__${blockCN}`;
      className.push(base);

      const { extraCN = {}, utilCN } = options;

      if (Object.keys(extraCN).length > 0) {
        for (const key in extraCN) {
          if (extraCN[key]) {
            className.push(`${base}--${key}`);
          }
        }
      }

      if (typeof utilCN === "string" && utilCN) {
        className.push(utilCN);
      }
      else if (Array.isArray(utilCN)) {
        for (const i in utilCN) {
          const cn = utilCN[i];
          cn && className.push(cn);
        }
      }

      return className.join(" ");
    }
  }
}
