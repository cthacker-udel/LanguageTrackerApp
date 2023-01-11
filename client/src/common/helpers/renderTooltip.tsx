import "./renderTooltip.css";

import React, { type ReactNode } from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";

type TooltipMessage = {
    title?: string;
    message?: string;
};

/**
 *
 * @param props
 * @param content
 */
export const renderTooltip = (
    properties: OverlayTriggerRenderProps,
    content: ReactNode | TooltipMessage,
): JSX.Element => {
    if (!React.isValidElement(content)) {
        const convertedContent: TooltipMessage = content as TooltipMessage;
        return (
            <Tooltip id="programming_lang_tooltip" {...properties}>
                <div className="d-flex flex-column">
                    {convertedContent.title && (
                        <div>{convertedContent.title}</div>
                    )}
                    {convertedContent.message && (
                        <div>{convertedContent.message}</div>
                    )}
                </div>
            </Tooltip>
        );
    }
    return (
        <Tooltip
            className="tooltip_content_button"
            id="programming_lang_tooltip"
            {...properties}
        >
            {content as ReactNode}
        </Tooltip>
    );
};
