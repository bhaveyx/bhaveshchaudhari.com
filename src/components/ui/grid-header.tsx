import React from "react";
import { cn } from "../../lib/utils";

interface Props {
	className?: string;
}

export function GridHeader(props: Props) {
	return (
		<>
			<div className={
				cn(
					"fixed inset-0 -z-10 h-full w-full bg-transparent bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-10",
					props.className
				)
			}></div>
		</>
	);
};
