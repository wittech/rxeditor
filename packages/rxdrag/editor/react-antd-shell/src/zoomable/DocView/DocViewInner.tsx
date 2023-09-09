import { memo } from "react"
import styled from "styled-components"
import { Space } from "antd"
import { Spring, useCanvasUrl } from "../../common"
import { IFrame, useActivedDocument, useCanvasConfig, useDocument } from "@rxdrag/react-core"
import classNames from "classnames"

const DocViewContainer = styled.div`
  position: relative;
  width: 800px;
  &.activied{
    .canvas-title{
      color: ${props => props.theme.token?.colorPrimary};
    }
    .document-content{
      outline: solid 4px ${props => props.theme.mode === "dark" ? "rgba(0,0,255, 0.1)" : "rgba(0,0,255, 0.05)"} ;
    }
  }

  .actions{
    display: none;
  }

  &:hover{
    .canvas-content{
      outline: solid 1px ${props => props.theme.token?.colorPrimary};
    }
    .actions{
      display: flex;
    }
  }
`

const CanvasToolbar = styled.div`
  display: flex;
  height: 32px;
  padding: 0px;
  color: ${props => props.theme.token?.colorText};
  //border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  //background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
`

const CanvasContent = styled.div`
  width: 100%;
  height: 600px;
  background-color: white;
`

const CanvasTitle = styled.span`
  color:${props => props.theme.token?.colorTextSecondary};
  font-size: 13px;
`

export const DocViewInner = memo(() => {
  const doc = useDocument()
  const canvasUrl = useCanvasUrl()
  const activedDoc = useActivedDocument()
  const canvasConfig = useCanvasConfig()

  return (
    <DocViewContainer className={classNames({ activied: activedDoc?.id === doc?.id })}>
      <CanvasToolbar>
        <CanvasTitle className="canvas-title">
          {doc?.getTitle()} - <em>{canvasConfig?.deviceName}</em>
        </CanvasTitle>
        <Spring />
        <Space className="actions">
          {/* <Button type="text" size="small" shape="circle" icon={<DeleteOutlined />} /> */}
        </Space>
      </CanvasToolbar>
      <CanvasContent className="document-content" >
        {doc &&
          <IFrame
            doc={doc}
            src={canvasUrl}
          />
        }
      </CanvasContent>
    </DocViewContainer>
  )
})