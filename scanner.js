// scanner.js

const vulnerabilityPatterns = [
    // =================================================================
    // High Severity Vulnerabilities
    // =================================================================
    {
        id: 'sql_injection',
        name: 'SQL Injection', name_en: 'SQL Injection',
        pattern: /(execute|query|prepare)\s*\([\s\S]*['"`]\s*\+\s*\w+/i,
        description: '사용자 입력이 SQL 쿼리에 직접 연결되어 잠재적인 SQL 인젝션 공격에 노출될 수 있습니다.',
        details: '동적 쿼리 생성 시 사용자 입력을 그대로 이어붙이면, 공격자가 악의적인 SQL 구문을 삽입하여 데이터베이스를 조작하거나 정보를 탈취할 수 있습니다.',
        details_en: 'When user input is directly concatenated into a SQL query, an attacker can insert malicious SQL syntax to manipulate or exfiltrate data from the database.',
        severity: 'High',
        category: '백엔드', category_en: 'Backend',
        recommendation_ko: '파라미터화된 쿼리(Prepared Statements) 또는 ORM을 사용하여 사용자 입력을 쿼리와 안전하게 분리하세요.',
        recommendation_en: 'Use parameterized queries (Prepared Statements) or an ORM to safely separate user input from the query.'
    },
    {
        id: 'hardcoded_secret',
        name: '하드코딩된 비밀 정보', name_en: 'Hardcoded Secrets',
        pattern: /(api_key|secret|password|token|auth_key|credentials|aws_access_key_id|client_secret)['"]?\s*[:=]\s*['"`][a-zA-Z0-9\-_/.@+]{16,}['"`]/i,
        description: 'API 키, 비밀번호 등 민감한 정보가 소스 코드에 하드코딩되어 있습니다.',
        details: '소스 코드는 버전 관리 시스템 등을 통해 외부에 노출될 수 있으므로, 민감한 정보를 직접 코드에 작성하는 것은 매우 위험합니다.',
        details_en: 'Hardcoding sensitive information is extremely risky as source code can be exposed through version control systems.',
        severity: 'High',
        category: '일반', category_en: 'General',
        recommendation_ko: '환경 변수, Docker Secrets, 또는 HashiCorp Vault와 같은 보안 저장소를 사용하여 민감한 정보를 코드와 분리하여 관리하세요.',
        recommendation_en: 'Use environment variables, Docker Secrets, or a secure storage like HashiCorp Vault to manage sensitive information separately from code.'
    },
     {
        id: 'detected-jwt-token',
        name: 'JWT 토큰 탐지', name_en: 'JWT Token Detected',
        pattern: /eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/,
        description: '코드에서 JWT(JSON Web Token) 형식의 문자열이 발견되었습니다. 민감한 정보일 수 있으므로 확인이 필요합니다.',
        details: 'JWT는 사용자 인증 정보 등을 담고 있으며, 소스 코드에 직접 노출될 경우 탈취되어 악용될 수 있습니다.',
        details_en: 'A string formatted as a JWT (JSON Web Token) was found in the code. This may be sensitive information and requires review.',
        severity: 'High',
        category: '보안', category_en: 'Security',
        recommendation_ko: '이 토큰이 민감한 정보를 담고 있다면, 환경 변수나 보안 스토어를 통해 안전하게 관리하세요. 만약 테스트용 더미 데이터라면 무시할 수 있습니다.',
        recommendation_en: 'If this token contains sensitive information, manage it securely through environment variables or a secret store. You can ignore this if it is dummy data for testing.'
    },
    {
        id: 'prototype_pollution',
        name: '프로토타입 오염', name_en: 'Prototype Pollution',
        pattern: /\[\s*['"]__proto__['"]\s*\]|Object\.prototype\.polluted/i,
        description: '안전하지 않은 객체 병합 또는 속성 정의로 인해 `Object.prototype`이 오염될 수 있습니다.',
        details: '공격자가 모든 객체에 영향을 미치는 프로토타입을 조작하여, 애플리케이션의 로직을 변경하거나 서비스 거부, 원격 코드 실행 등을 유발할 수 있습니다.',
        details_en: 'An attacker can manipulate the prototype, affecting all objects, to alter application logic, cause Denial of Service, or even achieve Remote Code Execution.',
        severity: 'High',
        category: '일반', category_en: 'General',
        recommendation_ko: '객체 병합 시 `Object.create(null)`를 사용하고, 사용자 입력을 키로 사용할 때 `__proto__`와 같은 키를 차단하세요. `Object.freeze(Object.prototype)`를 사용하는 것도 좋은 방어법입니다.',
        recommendation_en: 'When merging objects, use `Object.create(null)` and block keys like `__proto__` from user input. Using `Object.freeze(Object.prototype)` is also a good defense.'
    },
    {
        id: 'high-entropy-string',
        name: '엔트로피가 높은 문자열 탐지', name_en: 'High Entropy String Detected',
        pattern: /['"`][A-Za-z0-9+/]{40,}['"`]/,
        description: '엔트로피가 매우 높은 긴 문자열이 발견되었습니다. 이는 개인 키나 API 키와 같은 민감 정보일 수 있습니다.',
        details: '무작위로 보이는 긴 문자열은 암호화 키나 비밀 토큰일 가능성이 높습니다. 코드에 직접 저장하는 것은 위험합니다.',
        details_en: 'A long, high-entropy string was detected. This may be a private key or an API key.',
        severity: 'High',
        category: '보안', category_en: 'Security',
        recommendation_ko: '이 문자열이 민감 정보라면, 환경 변수나 보안 스토어로 즉시 이동시키세요. 만약 해시 값이나 공개 키 등 비민감 정보라면 무시할 수 있습니다.',
        recommendation_en: 'If this string is sensitive, move it to an environment variable or a secret store immediately. You can ignore this if it is non-sensitive information like a hash or public key.'
    },
    {
        id: 'insecure-document-method', // Semgrep ID: javascript.browser.security.insecure-document-method.insecure-document-method
        semgrepId: 'javascript.browser.security.insecure-document-method.insecure-document-method',
        name: '안전하지 않은 DOM 조작', name_en: 'Insecure DOM Manipulation',
        pattern: /\.innerHTML\s*=|document\.write\s*\(/i,
        description: 'innerHTML, document.write와 같이 안전하지 않은 메서드에 사용자 제어 데이터를 사용하면 XSS(Cross-Site Scripting) 취약점으로 이어질 수 있습니다.',
        details: '악의적인 스크립트가 포함된 문자열이 innerHTML, document.write 등을 통해 DOM에 삽입되면, 해당 스크립트가 실행되어 사용자의 세션을 탈취하거나 의도하지 않은 동작을 유발할 수 있습니다.',
        details_en: 'If a string containing a malicious script is inserted into the DOM via methods like innerHTML or document.write, the script can execute, potentially stealing user sessions or causing unintended actions.',
        severity: 'High',
        category: '프론트엔드', category_en: 'Frontend',
        recommendation_ko: '사용자 입력을 DOM에 삽입할 때는 `innerHTML` 대신 `textContent`를 사용하세요. HTML 삽입이 꼭 필요한 경우, DOMPurify와 같은 라이브러리를 사용하여 입력을 반드시 새니타이즈(Sanitize)해야 합니다.',
        recommendation_en: 'Use `textContent` instead of `innerHTML` when inserting user input into the DOM. If HTML insertion is necessary, you must sanitize the input using a library like DOMPurify.'
    },
    {
        id: 'command_injection',
        semgrepId: 'javascript.lang.security.detect-child-process.detect-child-process', // semgrepId 추가
        name: '커맨드 인젝션', name_en: 'Command Injection',
        pattern: /(exec|spawn|execSync)\s*\([\s\S]*['"`]\s*\+\s*\w+/i,
        description: '사용자 입력을 포함하여 쉘 명령을 실행하면 임의의 명령이 실행될 수 있는 Command Injection 공격에 취약할 수 있습니다.',
        details: '사용자 입력을 검증 없이 쉘 명령어에 포함시키면, 공격자가 `&&`, `;` 등의 문자를 이용해 의도하지 않은 추가 명령을 실행할 수 있습니다.',
        details_en: 'If user input is included in a shell command without validation, an attacker can use characters like `&&` or `;` to execute additional, unintended commands.',
        severity: 'High',
        category: '백엔드', category_en: 'Backend',
        recommendation_ko: '외부 프로세스를 실행할 때 사용자 입력을 인자로 안전하게 전달하고, 고정된 명령어만 사용하도록 제한하세요. 불가피하게 `exec`를 사용해야 한다면, 사용자 입력을 쉘 메타문자로부터 엄격하게 이스케이프 처리해야 합니다.',
        recommendation_en: 'When executing external processes, pass user input safely as arguments and restrict usage to fixed commands. If you must use `exec`, strictly escape user input from shell metacharacters.'
    },
    // =================================================================
    // Medium Severity Vulnerabilities
    // =================================================================
    {
        id: 'xss_innerHTML',
        name: 'innerHTML을 통한 XSS', name_en: 'Potential XSS via innerHTML',
        pattern: /\.innerHTML\s*[+=]\s*(?!['"`]).+/i,
        description: '신뢰할 수 없는 변수를 `innerHTML`에 직접 할당하면 Cross-Site Scripting (XSS) 공격에 취약할 수 있습니다.',
        details: '악의적인 스크립트가 포함된 문자열이 innerHTML을 통해 DOM에 삽입되면, 해당 스크립트가 실행되어 사용자의 세션을 탈취하거나 의도하지 않은 동작을 유발할 수 있습니다.',
        details_en: 'If a string containing a malicious script is inserted into the DOM via innerHTML, the script can execute, potentially stealing user sessions or causing unintended actions.',
        severity: 'Medium',
        category: '프론트엔드', category_en: 'Frontend',
        recommendation_ko: '`innerHTML` 대신 `textContent`를 사용하고, HTML을 동적으로 생성해야 할 경우 DOMPurify와 같은 라이브러리로 입력을 반드시 새니타이즈(Sanitize) 처리하세요.',
        recommendation_en: 'Use `textContent` instead of `innerHTML`. If you must create HTML dynamically, sanitize the input with a library like DOMPurify.'
    },
    {
        id: 'react-dangerouslysetinnerhtml',
        name: 'React의 dangerouslySetInnerHTML 사용', name_en: 'React: dangerouslySetInnerHTML Used',
        pattern: /dangerouslySetInnerHTML/i,
        description: 'React에서 `dangerouslySetInnerHTML`를 사용하면 XSS 공격에 노출될 수 있습니다.',
        details: '이름에서 알 수 있듯이, 이 속성은 위험하며 신뢰할 수 없는 HTML을 렌더링하는 데 사용하면 안 됩니다.',
        details_en: 'As the name implies, this property is dangerous and should not be used to render untrusted HTML.',
        severity: 'Medium',
        category: '프론트엔드', category_en: 'Frontend',
        recommendation_ko: '`dangerouslySetInnerHTML` 사용을 피하고, 데이터를 직접 렌더링하거나, 불가피할 경우 DOMPurify와 같은 라이브러리로 HTML을 사용 전에 반드시 새니타이즈하세요.',
        recommendation_en: 'Avoid using `dangerouslySetInnerHTML`. Render data directly, or if unavoidable, sanitize the HTML with a library like DOMPurify before use.'
    },
    {
        id: 'detect-non-literal-regexp',
        name: '동적 정규식 생성', name_en: 'Non-literal RegExp Creation',
        semgrepId: 'javascript.lang.security.audit.non-literal-regexp.non-literal-regexp',
        pattern: /new\s+RegExp\(/i,
        description: '사용자 입력과 같이 신뢰할 수 없는 값을 이용하여 정규식을 동적으로 생성하면, ReDoS(정규식 서비스 거부) 공격에 취약할 수 있습니다.',
        details: '공격자가 특정 패턴을 입력하여 정규식 엔진의 처리 시간을 기하급수적으로 증가시켜 서버 리소스를 고갈시킬 수 있습니다.',
        details_en: 'Dynamically creating a regular expression from untrusted input can lead to a Regular Expression Denial of Service (ReDoS) attack.',
        severity: 'Medium',
        category: '보안', category_en: 'Security',
        recommendation_ko: '정규식을 동적으로 생성해야 한다면, 사용자 입력을 엄격하게 검증하고 이스케이프 처리하세요. 가능한 한 정적인 정규식 리터럴을 사용하는 것이 안전합니다.',
        recommendation_en: 'If you must create a RegExp dynamically, strictly validate and escape user input. It is safer to use static regular expression literals whenever possible.'
    },
    {
        id: 'insecure_cookie',
        name: '안전하지 않은 쿠키 플래그', name_en: 'Insecure Cookie Flags',
        pattern: /res\.cookie\((?!.*(httpOnly:\s*true|secure:\s*true|sameSite:\s*['"](Strict|Lax)['"])).*\)/i,
        description: '쿠키에 `HttpOnly`, `Secure`, `SameSite`와 같은 보안 플래그가 충분히 설정되지 않았습니다.',
        details: '`HttpOnly`는 스크립트의 쿠키 접근을 막아 XSS 공격을 완화하고, `Secure`는 HTTPS에서만 쿠키를 전송하며, `SameSite`는 CSRF 공격을 방어하는 데 도움을 줍니다.',
        details_en: '`HttpOnly` prevents script access to cookies, mitigating XSS. `Secure` ensures cookies are only sent over HTTPS. `SameSite` helps defend against CSRF attacks.',
        severity: 'Medium',
        category: '방어', category_en: 'Defense',
        recommendation_ko: '세션 쿠키 설정 시 `res.cookie("session", "...", { httpOnly: true, secure: true, sameSite: \'Strict\' });`와 같이 보안 플래그를 반드시 포함하세요.',
        recommendation_en: 'When setting session cookies, always include security flags like `res.cookie("session", "...", { httpOnly: true, secure: true, sameSite: \'Strict\' });`.'
    },
    {
        id: 'weak_crypto',
        name: '취약한 암호화 알고리즘', name_en: 'Weak Cryptographic Algorithm',
        pattern: /createHash\s*\(\s*['"](md5|sha1)['"]\s*\)/i,
        description: '보안상 취약한 해시 알고리즘(MD5, SHA1)을 사용하고 있습니다. 충돌 공격에 취약하여 비밀번호 저장 등에 사용해서는 안 됩니다.',
        details: 'MD5와 SHA1은 현재의 컴퓨팅 파워로 충돌을 쉽게 찾을 수 있어, 다른 입력으로 같은 해시 값을 만들어내는 것이 가능합니다. 이는 데이터 무결성 검증이나 디지털 서명에 부적합합니다.',
        details_en: 'MD5 and SHA1 are susceptible to collision attacks with modern computing power, making them unsuitable for data integrity checks or digital signatures.',
        severity: 'Medium',
        category: '백엔드', category_en: 'Backend',
        recommendation_ko: 'SHA-256, SHA-512와 같은 강력한 해시 알고리즘을 사용하고, 비밀번호 저장 시에는 bcrypt나 scrypt를 사용하세요.',
        recommendation_en: 'Use strong hash algorithms like SHA-256 or SHA-512. For password storage, use bcrypt or scrypt.'
    },
    {
        id: 'open_redirect',
        name: '공개 리다이렉션', name_en: 'Open Redirect',
        pattern: /res\.redirect\s*\(\s*req\.(query|body)\.[a-zA-Z0-9_]*url/i,
        description: '사용자 입력을 검증 없이 리다이렉션 URL에 사용하여 피싱 공격에 악용될 수 있는 공개 리다이렉션 취약점이 존재합니다.',
        details: '공격자는 신뢰할 수 있는 사이트의 URL에 악성 사이트로 리다이렉션되는 파라미터를 추가하여, 사용자가 의심 없이 링크를 클릭하도록 유도할 수 있습니다.',
        details_en: 'An attacker can add a parameter to a trusted site\'s URL that redirects to a malicious site, tricking users into clicking the link.',
        severity: 'Medium',
        category: '백엔드', category_en: 'Backend',
        recommendation_ko: '리다이렉션 시 허용된 URL 목록(Whitelist)을 만들어, 사용자 입력이 해당 목록에 포함된 경우에만 리다이렉션을 허용하세요.',
        recommendation_en: 'When redirecting, create a whitelist of allowed URLs and only redirect if the user input is on that list.'
    },
    {
        id: 'missing-integrity', // Semgrep ID: html.security.audit.missing-integrity.missing-integrity
        semgrepId: 'html.security.audit.missing-integrity.missing-integrity',
        name: '외부 리소스 무결성 검증 누락', name_en: 'Missing Subresource Integrity',
        pattern: /<link[^>]+href="https?:\/\/[^>]+>|<script[^>]+src="https?:\/\/[^>]+>/i,
        description: '외부 스크립트나 스타일시트 로드 시 `integrity` 속성이 누락되었습니다. CDN 등이 공격받을 경우 의도치 않은 코드가 실행될 수 있습니다.',
        details: '`integrity` 속성은 브라우저가 외부에서 가져온 리소스(JS, CSS)가 중간에 변조되지 않았는지 확인할 수 있게 해줍니다. 이 속성이 없으면 공격자가 CDN을 장악했을 때 악성 코드를 사이트에 주입하여 XSS 등의 공격을 수행할 수 있습니다.',
        details_en: 'The `integrity` attribute allows the browser to verify that fetched resources (like JS or CSS) have not been manipulated. Without it, an attacker who compromises a CDN could inject malicious code into your site, leading to XSS and other attacks.',
        severity: 'Medium',
        category: '프론트엔드', category_en: 'Frontend',
        recommendation_ko: '외부 리소스(CDN 등)를 로드하는 `<script>` 또는 `<link>` 태그에 SRI(Subresource Integrity) 해시 값을 포함한 `integrity` 속성을 추가하세요. 예: <script src="..." integrity="sha384-..." crossorigin="anonymous"></script>',
        recommendation_en: 'Add the `integrity` attribute with an SRI (Subresource Integrity) hash value to all `<script>` and `<link>` tags that load resources from external origins (e.g., CDNs). Example: <script src="..." integrity="sha384-..." crossorigin="anonymous"></script>'
    },
    {
        id: 'avoid-v-html', // Semgrep ID: javascript.vue.security.audit.xss.templates.avoid-v-html.avoid-v-html
        semgrepId: 'javascript.vue.security.audit.xss.templates.avoid-v-html.avoid-v-html',
        name: 'Vue.js의 v-html 사용', name_en: 'Vue.js: v-html Directive Used',
        pattern: /v-html="/i,
        description: '웹사이트에 동적으로 HTML을 렌더링하는 v-html 디렉티브는 XSS(Cross-Site Scripting) 취약점으로 이어질 수 있어 매우 위험합니다.',
        details: 'v-html은 신뢰할 수 없는 사용자 제공 콘텐츠를 사용할 경우, 악의적인 스크립트가 사이트에서 실행되도록 허용할 수 있습니다. 이는 사용자 세션 탈취, 데이터 도난 등의 심각한 보안 문제로 이어질 수 있습니다.',
        details_en: 'Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS vulnerabilities. Using v-html on user-provided content can allow malicious scripts to be executed on your site.',
        severity: 'Medium',
        category: '프론트엔드', category_en: 'Frontend',
        recommendation_ko: 'v-html 사용을 피하고, 대신 이중 중괄호(`{{ }}`)를 사용한 텍스트 보간을 사용하세요. HTML 렌더링이 반드시 필요한 경우, DOMPurify와 같은 라이브러리를 사용하여 서버 또는 클라이언트 측에서 콘텐츠를 사전에 새니타이즈(Sanitize)하세요.',
        recommendation_en: 'Avoid using v-html and use text interpolation (mustaches `{{ }}`) instead. If you must render HTML, pre-sanitize the content on the server or client-side using a library like DOMPurify.'
    },
    {
        id: 'unknown-value-with-script-tag', // Semgrep ID: javascript.lang.security.audit.unknown-value-with-script-tag.unknown-value-with-script-tag
        semgrepId: 'javascript.lang.security.audit.unknown-value-with-script-tag.unknown-value-with-script-tag',
        name: 'script 태그 내 알 수 없는 값', name_en: 'Unknown Value in Script Tag',
        pattern: /<script>.*\{\{.*\}\}.*<\/script>/i,
        description: 'script 태그 내에서 출처를 알 수 없는 값을 사용하면 XSS(Cross-Site Scripting) 취약점이 발생할 수 있습니다.',
        details: 'script 태그의 내용으로 변수를 직접 사용하면, 공격자가 해당 변수에 악성 코드를 삽입하여 사용자의 브라우저에서 임의의 스크립트를 실행할 수 있습니다.',
        details_en: 'Using an unknown value inside a script tag can lead to XSS vulnerabilities, as an attacker could inject malicious code into the variable, allowing it to be executed by the user\'s browser.',
        severity: 'Medium',
        category: '프론트엔드', category_en: 'Frontend',
        recommendation_ko: 'script 태그 내에서는 신뢰할 수 없는 변수를 직접 사용하지 마세요. 데이터를 전달해야 하는 경우, data 속성을 사용하고 해당 값을 문자열로 엄격하게 검증 및 이스케이프 처리하세요.',
        recommendation_en: 'Do not use untrusted variables directly inside script tags. If you need to pass data, use data attributes and ensure the values are strictly validated and escaped as strings.'
    },
    {
        id: 'path_traversal',
        semgrepId: 'javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal', // semgrepId 추가
        name: '경로 탐색 (Path Traversal)', name_en: 'Path Traversal',
        pattern: /(fs\.(readFile|readFileSync|createReadStream)|require|path\.join)\s*\([^)]*userInput[^)]*\)/i,
        description: '사용자 입력을 파일 시스템 경로에 직접 사용하면, 상위 디렉토리(../../) 접근을 통해 민감한 파일에 접근할 수 있습니다.',
        details: '공격자가 `../`와 같은 경로 조작 문자를 입력하여, 웹 루트 디렉토리 외부의 민감한 파일(예: `/etc/passwd`)에 접근할 수 있습니다.',
        details_en: 'An attacker can input path traversal characters like `../` to access sensitive files outside of the web root directory (e.g., `/etc/passwd`).',
        severity: 'Medium',
        category: '백엔드', category_en: 'Backend',
        recommendation_ko: '사용자 입력을 경로에 사용하기 전에, `path.normalize()` 또는 `path.resolve()`를 사용하여 경로를 정규화하고, 의도된 기본 디렉토리 내에 있는지 반드시 검증하세요.',
        recommendation_en: 'Before using user input in a path, normalize it using `path.normalize()` or `path.resolve()` and always validate that the final path is within the intended base directory.'
    },
    // =================================================================
    // Low Severity Vulnerabilities
    // =================================================================
    {
        id: 'unsafe-formatstring',
        name: '안전하지 않은 문자열 포맷팅', name_en: 'Unsafe String Formatting',
        pattern: /console\.log\s*\(/i, // Example pattern
        description: '신뢰할 수 없는 값이 포함된 문자열을 포맷팅하거나 로그에 기록할 때, 잠재적인 정보 노출이나 인젝션 공격에 취약할 수 있습니다.',
        details: '로그에 민감한 정보가 포함되거나, 포맷팅 과정에서 예기치 않은 코드가 실행될 수 있습니다.',
        details_en: 'Formatting or logging strings containing untrusted values can be vulnerable to information disclosure or injection attacks.',
        severity: 'Low',
        category: '보안', category_en: 'Security',
        recommendation_ko: '로그에 기록하거나 문자열을 포맷팅할 때 사용자 입력과 같은 외부 값을 직접 사용하지 마세요. 필요한 경우, 데이터를 안전하게 정제(sanitize)한 후 사용하세요.',
        recommendation_en: 'Avoid using external values like user input directly in logging or string formatting. If necessary, sanitize the data before use.'
    },
    {
        id: 'cors_wildcard',
        name: '느슨한 CORS 정책', name_en: 'Insecure CORS Policy',
        pattern: /Access-Control-Allow-Origin['"]\s*:\s*['"]\*['"]/i,
        description: 'CORS 정책에서 모든 출처(`*`)를 허용하고 있습니다. (오탐 참고: 인증이 필요 없는 공개 API의 경우 의도된 설정일 수 있습니다.)',
        details: '`Access-Control-Allow-Origin: *`는 모든 도메인에서의 요청을 허용합니다. 만약 인증 정보(쿠키, 인증 헤더)와 함께 사용될 경우, 공격자 사이트가 사용자의 권한으로 리소스에 접근할 수 있게 됩니다.',
        details_en: '`Access-Control-Allow-Origin: *` allows requests from any domain. If used with credentials, an attacker\'s site could access resources with user privileges.',
        severity: 'Low',
        category: '방어', category_en: 'Defense',
        recommendation_ko: '민감한 정보를 다루는 경우, 신뢰할 수 있는 특정 도메인 목록을 만들어 해당 도메인만 `Access-Control-Allow-Origin` 헤더에 포함시키세요.',
        recommendation_en: 'If handling sensitive information, create a whitelist of trusted domains and include only those domains in the `Access-Control-Allow-Origin` header.'
    },
    {
        id: 'missing_helmet',
        name: '보안 헤더(Helmet) 부재', name_en: 'Missing Security Headers (Helmet)',
        pattern: /const\s+app\s*=\s*express\(\);(?![\s\S]*app\.use\(helmet\(\)\))/i,
        description: 'Express.js 애플리케이션에서 보안 관련 HTTP 헤더를 설정하는 `helmet` 미들웨어가 확인되지 않았습니다.',
        details: '`helmet`은 XSS 방어, 클릭재킹 방지 등 다양한 보안 위협을 완화하는 HTTP 헤더를 자동으로 설정해줍니다.',
        details_en: 'The `helmet` middleware automatically sets various HTTP headers that help mitigate security threats like XSS and clickjacking.',
        severity: 'Low',
        category: '방어', category_en: 'Defense',
        recommendation_ko: '`app.use(helmet());` 코드를 추가하여 애플리케이션의 보안을 강화하세요.',
        recommendation_en: 'Add `app.use(helmet());` to enhance your application\'s security.'
    },
    {
        id: 'log_injection',
        name: '로그 인젝션', name_en: 'Log Injection',
        pattern: /logger\.(info|warn|error|log)\s*\([\s\S]*\+\s*req\.(query|body|params)\./i,
        description: '사용자 입력을 로그에 직접 기록하면, 로그 위조(Log Injection/Spoofing)를 통해 공격자가 로그를 오염시키거나 시스템을 속일 수 있습니다.',
        details: '공격자가 로그에 개행 문자(\\n, \\r)를 삽입하여, 거짓 로그를 생성함으로써 관리자를 속이거나 자동화된 로그 분석 시스템을 방해할 수 있습니다.',
        details_en: 'An attacker can insert newline characters (\\n, \\r) into logs to create fake log entries, deceiving administrators or disrupting automated log analysis systems.',
        severity: 'Low',
        category: '백엔드', category_en: 'Backend',
        recommendation_ko: '사용자 입력을 로깅하기 전에 개행 문자(\\n, \\r) 등을 제거하거나 이스케이프 처리하여 한 줄의 로그로 유지되도록 하세요.',
        recommendation_en: 'Before logging user input, remove or escape newline characters (\\n, \\r) to ensure it remains a single log line.'
    }
];

function scanContent(content) {
    const findings = [];
    const lines = content.split('\n');
    
    vulnerabilityPatterns.forEach(vuln => {
        if (['missing_helmet', 'missing_csrf'].includes(vuln.id)) {
            if (vuln.pattern.test(content)) {
                findings.push({ ...vuln, line: 1, code: `Application-wide check: ${vuln.name} protection might be missing.` });
            }
        } 
        else {
            lines.forEach((line, index) => {
                if (vuln.pattern.test(line)) {
                    const isDuplicate = findings.some(f => f.id === vuln.id && f.line === index + 1);
                    if (!isDuplicate) {
                        findings.push({ ...vuln, line: index + 1, code: line.trim() });
                    }
                }
            });
        }
    });

    return findings;
}

module.exports = { scanContent, vulnerabilityPatterns };
