import { IMaterial } from "@rxdrag/react-core";
import { ReactionableNode } from ".";
import { ActivityResource, IActivityNode } from "@rxdrag/minions-logicflow-editor";
import { IPropConfig } from "@rxdrag/minions-runtime-react";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DraggableText } from "../DraggableText";
import { IDesignerEngine } from "@rxdrag/core";
import { reactionMaterial, methodIcon } from "@rxdrag/minions-react-materials";

export function getReactionNodes(rNode: ReactionableNode, engine:IDesignerEngine|undefined, comMaterial?: IMaterial) {
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  return comMaterial?.controller?.reactions?.map(reaction => {
    const label = reaction.label?.startsWith("$")
      ? engine?.getLocalesManager().getComponentSettingsMessage(comMaterial.componentName, reaction.label.substring(1))
      : reaction.label;
    return {
      key: rNode.node.id + reaction.name,
      title: <ActivityResource
        material={reactionMaterial as IActivityMaterial<React.ReactNode>}
        createNode={() => {
          const node: IActivityNode<IPropConfig> = {
            id: createId(),
            //label: title,
            type: reactionMaterial.activityType,
            activityName: reactionMaterial.activityName,
            inPorts: [
              {
                id: createId(),
                name: reaction.name,
                label: label || "",
              },
            ],
            outPorts: [
              {
                id: createId(),
                name: "output",
                label: "",
              },
            ],
            config: {
              param: {
                controllerId: ctrlMeta?.id
              }
            }
          }

          return node
        }}
      >
        {
          (onStartDrag) => {
            return <DraggableText onMouseDown={onStartDrag}>
              {label}
            </DraggableText>
          }
        }
      </ActivityResource>,
      isLeaf: true,
      icon: methodIcon,
    }
  }) || []
}