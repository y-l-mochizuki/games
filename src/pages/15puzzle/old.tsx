import { Layout } from "@/components/Layout";
import React, { useEffect } from "react";

const old = () => {
  const lines = 4;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const table = document.getElementById("table")!;
    const tiles: HTMLTableCellElement[] = [];

    type ExtendsTarget = EventTarget & {
      dataset: {
        index: string;
        value: string;
      };
    };

    function isExtendsTarget(
      target: EventTarget | null
    ): target is ExtendsTarget {
      if (!target) return false;
      return "dataset" in target;
    }

    function swap(i: number, j: number) {
      let temp = tiles[i].dataset.value;
      tiles[i].textContent = tiles[j].textContent;
      tiles[i].dataset.value = tiles[j].dataset.value;
      tiles[j].textContent = temp || "";
      tiles[j].dataset.value = temp || "";
    }

    function click(e: MouseEvent) {
      const target = e.target;
      if (!isExtendsTarget(target)) return;
      const i = Number(target.dataset.index);

      if (i - lines >= 0 && tiles[i - lines].dataset.value === "0") {
        swap(i, i - lines);
      } else if (
        i + lines < lines * lines &&
        Number(tiles[i + lines].dataset.value) === 0
      ) {
        swap(i, i + lines);
      } else if (i % lines !== 0 && Number(tiles[i - 1].dataset.value) === 0) {
        swap(i, i - 1);
      } else if (i % lines !== 3 && Number(tiles[i + 1].dataset.value) === 0) {
        swap(i, i + 1);
      }
    }

    function init() {
      for (let i = 0; i < 4; i++) {
        const tr = document.createElement("tr");

        for (let j = 0; j < 4; j++) {
          const td = document.createElement("td");
          td.className = "tile";
          const index = i * lines + j;
          td.dataset.index = index.toString();
          td.dataset.value = index.toString();
          td.textContent = index === 0 ? "" : index.toString();
          // デバッグ用
          // td.textContent = `index:${index === 0 ? "" : index.toString()}
          // value: ${index.toString()}`;
          td.onclick = click;
          tr.appendChild(td);
          tiles.push(td);
        }

        table.appendChild(tr);
      }

      for (let i = 0; i < 1000; i++) {
        click({
          target: {
            dataset: { index: Math.floor(Math.random() * 16).toString() },
          },
        });
      }
    }

    init();

    return () => {
      table.innerHTML = "";
    };
  }, []);

  return (
    <Layout>
      <table id="table" />
    </Layout>
  );
};

export default old;
