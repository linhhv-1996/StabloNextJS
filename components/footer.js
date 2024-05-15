import Container from "@/components/container";
// import ThemeSwitch from "@/components/themeSwitch";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} wordwhisperer.co - All
        rights reserved.
      </div>
      <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
        <span>
          
          <a
            href="/"
            rel="noopener"
            target="_blank">
            Privacy policy
          </a>
        </span>
        <span>&middot;</span>
        <span>
          {" "}
          <a
            href="/"
            rel="noopener"
            target="_blank">
            Term of uses
          </a>
        </span>
      </div>
      {/* <div className="flex items-center justify-center mt-2">
        <ThemeSwitch />
      </div> */}
      {/* <Backlink /> */}
    </Container>
  );
}

const Backlink = () => {
  return (<></>);
};
