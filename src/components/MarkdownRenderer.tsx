import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/monokai.min.css";

interface Props {
    text: string;
}

const MarkdownRenderer = ({ text }: Props) => {
    return (
        <div className="w-[85vw] md:w-[90vw] lg:w-[55vw]">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {text}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
