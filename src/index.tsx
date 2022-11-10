import React from "react";
import { Cell } from "./components/Cell";
import {
  FormulaOptionsForMathjax,
  MarkdownForMathjax,
} from "./components/MarkdownForMathjax";
import { BaseProps } from "./types";

import pkg from "../package.json";

console.debug(`react-ipynb-renderer@${pkg.version} is working.`);

export type Props = BaseProps & {
  formulaOptions?: FormulaOptionsForMathjax;
};

export const IpynbRenderer: React.FC<Props> = React.memo(
  ({
    ipynb,
    syntaxTheme = "xonokai",
    language = "python",
    bgTransparent = true,
    formulaOptions = {},
    mdiOptions = {},
    htmlFilter = (input: string) => input,
  }) => {
    const cells =
      ipynb.cells || (ipynb.worksheets && ipynb.worksheets[0].cells) || [];
    return (
      <div className="react-ipynb-renderer-mathjax react-ipynb-renderer ipynb-renderer-root container">
        {cells.map((cell, i) => {
          cell.auto_number = i + 1;
          return (
            <Cell
              key={i}
              cell={cell}
              syntaxTheme={syntaxTheme}
              language={language}
              bgTransparent={bgTransparent}
              formulaOptions={formulaOptions}
              mdiOptions={mdiOptions}
              htmlFilter={htmlFilter}
              Markdown={MarkdownForMathjax}
            />
          );
        })}
      </div>
    );
  }
);
