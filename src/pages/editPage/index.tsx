import React, { useState } from "react";
import {
    Editor,
    EditorState,
    convertToRaw,
    convertFromRaw,
    ContentState,
    RichUtils,
    AtomicBlockUtils,
} from "draft-js";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import CodeIcon from "@material-ui/icons/Code";
import useStyleMap from "./useStyleMap";

const useStyles = makeStyles((theme) => ({
    draftEditorContainer: {
        "& .public-DraftEditorPlaceholder-root": {
            color: "rgb(145, 151, 163)",
            position: "absolute",
            userSelect: "none",
        },
        "& .public-DraftEditor-content": {
            minHeight: 450,
        },
        "& ul": {
            paddingLeft: 20,
        },
    },
    textarea: {
        width: "100%",
    },
    textField: {
        paddingLeft: theme.spacing(),
        paddingRight: theme.spacing(),
        "& .MuiSelect-root": {
            "& option": {
                color: "rgba(0, 0, 0, 0.87)",
            },
        },
        "& .MuiInput-underline:before": {
            border: "none",
        },
    },
}));

export default function DraftJsPractice(): JSX.Element {
    const classes = useStyles();

    const { fontFamilyStyleMap, fontSizeStyleMap, customStyleMap } =
        useStyleMap();

    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(ContentState.createFromText("Hello"))
    );

    const [fontFamilySelected, setFontFamilySelected] = useState("");
    const [fontSizeSelected, setFontSizeSelected] = useState("");

    const handleChangeEditorState = (
        internalEditorState: EditorState
    ): void => {
        setFontFamilySelected("");
        Object.keys(fontFamilyStyleMap).forEach((key): void => {
            if (internalEditorState.getCurrentInlineStyle().has(key)) {
                setFontFamilySelected(key);
            }
        });
        setFontSizeSelected("");
        Object.keys(fontSizeStyleMap).forEach((key): void => {
            if (internalEditorState.getCurrentInlineStyle().has(key)) {
                setFontSizeSelected(key);
            }
        });
        setEditorState(internalEditorState);
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

    const handleToggleInlineStyleClick = (inlineStyle: string): void => {
        handleChangeEditorState(
            RichUtils.toggleInlineStyle(editorState, inlineStyle)
        );
    };

    const handleToggleFontFamilyInlineStyleClick = (
        inlineStyle: string
    ): void => {
        Object.keys(fontFamilyStyleMap).forEach((key): void => {
            if (editorState.getCurrentInlineStyle().has(key)) {
                handleChangeEditorState(
                    RichUtils.toggleInlineStyle(editorState, key)
                );
            }
        });
        if (!editorState.getCurrentInlineStyle().has(inlineStyle)) {
            handleChangeEditorState(
                RichUtils.toggleInlineStyle(editorState, inlineStyle)
            );
        }
    };

    const handleToggleFontSizeInlineStyleClick = (
        inlineStyle: string
    ): void => {
        Object.keys(fontSizeStyleMap).forEach((key): void => {
            if (editorState.getCurrentInlineStyle().has(key)) {
                handleChangeEditorState(
                    RichUtils.toggleInlineStyle(editorState, key)
                );
            }
        });
        if (!editorState.getCurrentInlineStyle().has(inlineStyle)) {
            handleChangeEditorState(
                RichUtils.toggleInlineStyle(editorState, inlineStyle)
            );
        }
    };

    const handleChangeFontFamilySelected = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFontFamilySelected(event.target.value);
        handleToggleFontFamilyInlineStyleClick(event.target.value);
    };

    const handleChangeFontSizeSelected = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFontSizeSelected(event.target.value);
        handleToggleFontSizeInlineStyleClick(event.target.value);
    };

    const handleClick = () => {
        const base64 =
            "data:image/png;base64,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";
        const newEditorState = insertImage(editorState, base64);
        setEditorState(newEditorState);
    };

    const insertImage = (editorState: any, base64: any) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            {
                src: "https://raw.githubusercontent.com/niuware/niuware.github.io/master/public/assets/mui-rte/editor-1-9-0.png",
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        return AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            " "
        );
    };

    return (
        <Grid container>
            <button onClick={() => handleClick()}>Insert an image</button>

            <Grid item xs={12}>
                <TextField
                    select
                    className={classes.textField}
                    value={fontFamilySelected}
                    onChange={handleChangeFontFamilySelected}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value="">預設字型</option>
                    {Object.keys(fontFamilyStyleMap).map(
                        (key): JSX.Element => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        )
                    )}
                </TextField>
                <TextField
                    select
                    className={classes.textField}
                    value={fontSizeSelected}
                    onChange={handleChangeFontSizeSelected}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value="">預設大小</option>
                    {Object.keys(fontSizeStyleMap).map(
                        (key): JSX.Element => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        )
                    )}
                </TextField>

                <IconButton
                    color="inherit"
                    onClick={(): void => handleToggleInlineStyleClick("BOLD")}
                >
                    <FormatBoldIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    onClick={(): void => handleToggleInlineStyleClick("ITALIC")}
                >
                    <FormatItalicIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    onClick={(): void =>
                        handleToggleInlineStyleClick("UNDERLINE")
                    }
                >
                    <FormatUnderlinedIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    onClick={(): void => handleToggleInlineStyleClick("CODE")}
                >
                    <CodeIcon />
                </IconButton>
            </Grid>

            <Grid item xs={6}>
                <Paper className={classes.draftEditorContainer}>
                    <Editor
                        editorState={editorState}
                        onChange={handleChangeEditorState}
                        placeholder="請在此輸入文章內容"
                        customStyleMap={customStyleMap}
                    />
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <textarea
                    rows={30}
                    className={classes.textarea}
                    value={JSON.stringify(
                        convertToRaw(editorState.getCurrentContent()),
                        null,
                        2
                    )}
                    onChange={handleChangeTextArea}
                />
            </Grid>
        </Grid>
    );
}
