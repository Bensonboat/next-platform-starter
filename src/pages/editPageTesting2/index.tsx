import React, { useState } from "react";
import ReactDOM from "react-dom";
import MUIRichTextEditor from "mui-rte";
import { Typography } from "@material-ui/core";
import {
    convertFromRaw,
    convertToRaw,
    EditorState,
    ContentBlock,
    ContentState,
} from "draft-js";
import TableChartIcon from "@material-ui/icons/TableChart";
import { stateToHTML } from "draft-js-export-html";
import useResponsive from "hooks/useResponsive";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const MyBlock = (props: any) => {
    console.log(props, "###");
    console.info(convertFromRaw(props.children));
    // console.log("console. editor state: ", EditorBlocks(props));
    // props.children.map((i) => {
    //   console.log(ContentBlock(i.props.children));
    // });
    // const elems = props.children.map((child) => (
    //   <Typography variant="h1">
    //     {child?.props?.children?.props?.block?.getText() || ""}
    //   </Typography>
    // ));
    console.log(
        "text: ",
        props.children[0].props.children.props.block.getText()
    );
    console.log("props: ", props);
    return (
        <Typography
            style={{
                padding: 10,
                backgroundColor: "#ebebeb",
            }}
        >
            My Block content is:
            {props.children}
        </Typography>
    );
};

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                marginTop: 20,
                width: "50%",
                border: "1px solid red",
            },
            editor: {
                // border: "1px solid green",
            },
        },
    },
});

const Testing2 = () => {
    // const { width } = useResponsive();
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(ContentState.createFromText("Hello"))
    );

    const [html, setHtml] = useState("");

    const RTEtoHtml = (data: any) => {
        console.log(data, "data");
        let options = {
            blockRenderers: {
                atomic: (block: any) => {
                    let entity;
                    let key = block.getEntityAt(0);
                    if (key) {
                        entity = editorState.getCurrentContent().getEntity(key);
                    } else {
                        const contentStateWithEntity = editorState
                            .getCurrentContent()
                            .createEntity("IMAGE", "IMMUTABLE", {});
                        const entityKey =
                            contentStateWithEntity.getLastCreatedEntityKey();
                        entity = editorState
                            .getCurrentContent()
                            .getEntity(entityKey);
                    }
                    if (entity.getType() === "IMAGE") {
                        const data = entity.getData();
                        console.log(data, "================================");
                        const { url, width, height } = entity.getData();
                        return `<img  src=${url} width=${width} height=${height} alt="image"/>`;
                    }
                },
            },
        };
        // @ts-ignore
        return stateToHTML(convertFromRaw(JSON.parse(data)), options);
    };

    const handleChangeTextArea = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setEditorState(
            EditorState.createWithContent(
                convertFromRaw(JSON.parse(event.target.value))
            )
        );
    };

    const save = (data: any) => {
        console.log(typeof data, data);
        // console.info(
        //     JSON.stringify(convertToRaw(data.getCurrentContent()), null, 2)
        // );
        // console.log(data, "data");

        // if (data === "") {
        //     return;
        // }

        setHtml(RTEtoHtml(data));

        // convertFromRaw(data)
        //     .getBlocksAsArray()
        //     .map((block) => {
        //         console.info("block: ", block);
        //         console.log(block.getData());
        //     });
    };

    const createMarkup = (content: any) => {
        return { __html: content };
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
                <MuiThemeProvider theme={defaultTheme}>
                    <MUIRichTextEditor
                        onSave={save}
                        label="Type something here..."
                        // toolbar={false}
                    />
                </MuiThemeProvider>
            </div>

            {/* <textarea
                rows={30}
                value={JSON.stringify(
                    convertToRaw(editorState.getCurrentContent()),
                    null,
                    2
                )}
                // onChange={handleChangeTextArea}
            /> */}
            {html}
            {/* @ts-ignore */}
            <div
                style={{ color: "red", fontSize: "30px" }}
                dangerouslySetInnerHTML={createMarkup(html)}
            ></div>
        </div>
    );
};

export default Testing2;
