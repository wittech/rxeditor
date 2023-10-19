import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { memo, useCallback } from "react"
import { IExtensionLogicFlow } from "../../../interfaces/extension";

export const ScriptLogicAction = memo((
  props: {
    scriptLogic: IExtensionLogicFlow,
  }
) => {
  const { scriptLogic } = props;
  // const metaId = useMetaId();
  // const deleteOrches = useDeleteScriptLogic(metaId)

  // const handleDelete = useCallback(() => {
  //   deleteOrches(scriptLogic.uuid)
  // }, [deleteOrches, scriptLogic.uuid]);

  return (
    <Button
      type="text"
      shape='circle'
      size='small'
      //onClick={handleDelete}
      style={{ color: "inherit" }}
    >
      <DeleteOutlined />
    </Button>
  )
})
