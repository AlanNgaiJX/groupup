function home(props) {
    function routeTo(path) {
        props.history.push(path);
    }

    return (
        <div id="home">
            <ul>
                <li>
                    <button onClick={() => routeTo("/regist-phone")}>
                        to regist-phone
                    </button>
                </li>
                <li>
                    <button onClick={() => routeTo("/regist-verify")}>
                        to regist-verify
                    </button>
                </li>
                <li>
                    <button onClick={() => routeTo("/regist-pwd")}>
                        to regist-pwd
                    </button>
                </li>
                <li>
                    <button onClick={() => routeTo("/login")}>
                        to login
                    </button>
                </li>
                <li>
                    <button onClick={() => routeTo("/test-page")}>
                        to test-page
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default home;
