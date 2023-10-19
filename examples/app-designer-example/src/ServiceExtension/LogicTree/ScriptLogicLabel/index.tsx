import React, { useEffect, useState } from "react";
import { memo } from "react";
import { ScriptLogicAction } from "./ScriptLogicAction";
import { IExtendsionScript } from "../../../interfaces/extension";
import { TreeNodeLabel } from "@rxdrag/uml-editor";

export const ScriptLogicLabel = memo((
  props: {
    scriptMeta: IExtendsionScript
  }
) => {
  const { scriptMeta } = props;
  const [name, setName] = useState(scriptMeta.name);

  useEffect(() => {
    setName(scriptMeta.name)
  }, [scriptMeta])


  return (
    <TreeNodeLabel
      action={
        <ScriptLogicAction scriptLogic={scriptMeta} />
      }
    >
      <div>{name}</div>
    </TreeNodeLabel>
  )
})
