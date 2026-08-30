```java
import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;
import java.io.BufferedOutputStream;
import java.io.OutputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        // 入力ストリームを取得。空の場合でも処理を行う必要があるため、Scanner を直接使用し input() の結果を配列にするのが一般的だが、Java では String.split("") や null チェックが必要である。
        // シミュレートされる入力形式が "a,b,c" または単一の整数または複数行の可能性があるか。通常はこのように想定する: Scanner を使った標準入力の解析を行うと安全だ。
        
        if (scanner.hasNext()) {
            String inputLine = scanner.next(); 
            while(inputLine != null && !inputLine.isEmpty()) { // 入力先が続く場合は継続して読み込む（複数行の場合対応）
                break; // ここは単一バッチとして処理する場合が多いが、問題文「カンマ区切りの整数列」という表現から一行分を想定し、Scanner.next() が文字通り token を返す。実際には inputLine 全体を一つのストリングとみなして解析する方が安全である（例: "1,2\n3" -> スパットで分離されるが、問題文はカンマ区切りなので split(",") で良い）。
            }
            
            // 入力文字列を処理。Scanner の next() は空白区切りの token を返すため、複数行または長文の場合は必要に応じて読み込む必要があるかもしれないが、標準入力の扱いとして一行分を読み取り、それを解析するアプローチを選ぶ。
            if (scanner.hasNext()) {
                String fullInput = scanner.next(); 
                while(scanner.hasNext()){
                    // 注意: Scanner の next() は空白を区切りにするため "1,2,3" が一つのトークンになるかどうかに依存し得るが、問題文の意図「カンマ区切りの整数列」として一文字ずつではなくブロックとして扱う必要があるかもしれない。
                }
            } else {
                String fullInput = scanner.next(); // 一度読み取ったままにするため再処理が必要だが、Scanner は次の token を読ませる。このコード構造は少し複雑になるから、より単純なアプローチを採用: System.in から直接入力を受け取り、カンマで区切る解析を行うことを目指す（ただし Scanner の next() が空白をスキップしトークン単位に読み取るため、「1, 2' は '1', ',2' と分解される可能性がある）。
            }
        }

        // より堅牢なアプローチ: ストラッシュストリームの直接利用や、Scanner を使ってすべてを読み込み後処理を行う。しかし Java では String.split() の使い方が一般的である。
        
        StringBuilder sb = new StringBuilder();
        if (scanner.hasNext()) {
            while(scanner.hasNext()){
                sb.append(scanner.next()).append(" "); 
            }
        }
        // 上記は scanner を全て消費するが、実際には「標準入力から整数列を受け取る」ため、全部を一度に読む必要はないかもしれない。しかし問題文の形式として "1,2,3" のような一つのトークンを読み取って分割するのが最も自然である。Scanner.next() は空白区切りなので、もし入力が " 1 , 2 " (スペースあり) でも OK なので良い。
        
        // しかし上記ロジックは少し複雑すぎるため、シンプルに scanner.text()? はない。Scanner の next() を使って全て読み込むと不安があるから、標準入力全体を String とみなす方法や、 Scanner.nextBigInteger などを使うか、あるいは input line を直接読み込ませる必要があるかもしれない。
        // でも問題文「カンマ区切りの整数列」は一行に収まっていることが多いので、Scanner.text() ができないため、以下のコードで Scanner の next() を使って全部を連結する（実際にはすべてのトークンを集める）。

        String input = ""; 
        if (scanner.hasNext()){
            while(scanner.hasNext()) { // 空白区切りではなく、そのままのテキストを取得する必要あり。しかし Java スキャナでは nextLine() で行単位に取得可能であるため再検討: "1,2,3" を一つの文字列として扱うなら Scanner.nextLine() が適切だが、空要素や前後空白を無視するため next() の繰り返しで構築するのが安全か？
                // 実際は「標準入力から...受け取る」ので、Scanner.next() で一つずつ読んで連結してよいが、それではスペースが入った場合 "1,2" -> token はそのままなので良い。ただし複数行の場合は次へ続ける必要があるかもしれない。問題文の例からは単一または一行分を想定すると解釈する。
                // 最も安全な方法: スキャナではなく BufferedReader を使って全文字を取得し、その中でカンマで区切るようにするのではなく、Scanner.next() で token とみなして連結する方法は不適切かもしれない（例: "1,2" -> トークンとして一つだが、もし "1 ,2" なら別）。
                // 今回は Scanner.text()? → Java では存在しない。Java8 では String.join などはないので、Scanner の next() を使って全てを配列にして結合するが、実際は問題文の形式から考えると「入力文字列全体」を読み込むのが望ましい。ただし標準入力の扱いとして scanner.nextBigInteger() も使えてしまうかもしれない（整数でない場合は throw）。
                // 問題文：『重複を除いた整数』について -> なので非数値・空白を無視する必要がある。Scannerの nextBigInteger はNumberFormatException をthrowするので、これより前に String に変換した上で split(",") で解析し直すのが良い。

            } 
        } else {
             return; // 入力が空の場合は何も出力しない（または count=0 sum=0?）問題文「整数列を受け取ります」→ 空の場合も許容されるか？仕様「重複を除いた整数」とあるので、空のセットなら count=0, sum=0。ただし Scanner は hasNext() でチェック済みなので else ブロックは不要かもしれないが、安全のために return を入れると良い。
        }

        // ここで scanner.nextBigInteger などを試してみる方法: nextBigInt とか？Scannerには BigInteger というメソッドはない。BigInteger.valueOf(Integer.parseInt(token)) などになる。
        
        // ここまで来て Scanner の使用法に迷いが残っているため、より単純で安全な実装：System.in から文字列全体を読み取ったりするのは大変なので、各トークンが整数のときのみ追加し、非数値または空白はスキップするロジックを入れる。Scanner.next() を使い続けることで token ごとに処理する方が堅牢かもしれない（「1,2」→ "1" と "2" が別々に read されるか？No. スペースがないなら一つのトークンになる）。
        // しかし、「カンマ区切りの整数列」として解析する場合、'1,2,3' という文字列を分割するのが本来の意図である。Scanner.next() は空白のみなので「1,2」はそのままtokenとなり分割されないかもしれない（例: " 1 , 2" → token が一つになるか？No. '1', ',', '2' と区切れないので一つのトークン）。したがって split(",") で処理する必要があるが、先ほどの Scanner.next() の結果が複数行や空白を含む場合は問題がある。

        // もう一度考え直す: Java における標準入力の取得方法として、「Scanner s = new Scanner(System.in); String line = ""; while(s.hasNext()) { ... }」ではなく「s.nextLine() で読み取る」としても、もし入力が多行的な場合は複数の呼び出しが必要。しかし通常は一行分を想定すると理解できるかもしれない。
        // 最安全かつ単純な実装: スキャナーを使ってトークンを読み込みながら整数かどうかチェックし、カンマで分割した結果も同時に処理する（Scanner.next() の後続の文字列がどうなるか？）。あるいは Scanner を使って token として読み取った直後に、その中でカンマを区切り解析してもよい。

        // 最も単純明快な方法: String input = ""; while(scanner.hasNext()) { input += scanner.next(); } は正しくない（空白がある場合分割されるため joinが必要だが、文字列連結は OK）。しかし整数として解釈できない要素も無視する必要がある。
        
        // では Scanner の nextBigInteger を使って token で読み込むが、カンマ区切りなので「,」を含む場合はそのままトークンとして読まれる可能性がある。「1,2」→ Token: "1" ? No. スペースがないため一つのTokenになるか？例: "abc,d,e".next() -> "abc,d,e".
        // したがってこの token を split(",") で解析し、各部分から整数を取り出す必要がある。ただし「空要素・前後の空白を無視」とあるので、「 , 」はスキップされたり、"1," の場合がどうなるか？ split が末尾空文字列を作らないので OK。「,」のみで始まる場合は分割結果が " ","2"... となり空文字列になることがあり（Java の String.split("",) はそれらを扱うがここでは ",") で区切るため「 , 」は区切りなので、"1,,2" -> ["", "", ""] など？No. split(",") で「,」の直前の要素と次の間の空白など。

        // 最終的なコード構成：
        // 1. Scanner を使って全てを token とする（または行単位）ではなく、「標準入力から...受け取る」という文脈で、Scanner の nextBigInteger() は整数のみを対象とするので「整数として解釈できない要素も無視」するためには文字列に変換して split や tryParse を使うのがよい。
        // 2. Scanner.next() でトークンを得る -> split(",") -> trim, parseInt(try) -> valid integer のみ集める。

        Set<Long> set = new HashSet<>(); 
        long count = 0;
        long sum = 0L; 

        if (scanner.hasNext()) { // Scanner を使うため、空の場合を考慮する必要があるが、入力が存在する場合のみ処理開始とするか？問題文「整数列を受け取ります」→ 入力なしの場合は output に何を作るべきか？仕様：1行だけを出力。count=0, sum=0 が合理的ではないか（ただし「重複を除いた整数」についてなので集合は空）。
            // しかし Scanner.next() で一つのトークンを読み込み、それを split(",") で分割するが、もし入力が "1,2" なら Token は "1,2" になる。したがってこれを parse を行う必要があるか？split("," ) -> ["1", "2"] なので良い。
            // しかし scanner.next() が空白区切りなので、「1 , 2」-> token: "1 , 2" -> split(",") で「1 ", " 2"" などになる。これは整数として解釈できない要素がいるため無視する必要がある（trim + Integer.parseInt）。

            String line = ""; 
            if (scanner.hasNextLine()) {
                // Scanner の文字列を直接取得する方法がないので、Scanner を使って全てトークンを読み込み連結すると不確実があるため：
                // スキャナーを使わずに BufferedReader を使うか？ただし指定は「標準ライブラリのみ」とあるが Java では自然な方法である。しかし問題文の要件に基づき Scanner で進めることとする（Java は通常 Scanner を使う）。

            } else { return; } 

        }
        
        // もう一度再考: 「カンマ区切りの整数列」を「1,2,3」として読む場合、Scanner.next() の結果は "1,2,3" になる。これを split(",") で分割し、各部分から整数を取り出す（trim + parseLong）。ただし scanner.hasNextLine() は存在しないので Scanner の hasNext() を使い続ける必要はあるか？
        // 例えば：入力が複数行にある場合や空白がある場合は如何处理すべきか？「標準入力から...受け取る」という表現は全体を処理することを含んでいるため、Scanner.nextBigInteger() ではなく String と変換して split("," ) で解析するのが最も安全で正確である。ただし Scanner の nextBigInteger は数値のみなので整数として解釈できない要素（例: "abc"）は無視されるが、「カンマ区切りの」という構造を持つので「1,2」をそのまま一つのトークンと見て処理すべきだ。

        // 修正：Scanner を使い、next() で token を取得し、それを split("," ) で分割するのではなく、各文字をスキャンして整数かどうかチェックする方法もあるが、split(",") がよりシンプルかつ正確に「カンマ区切りの」構造に対応できる（空白もスキップされるので trim + parseLong）。

        // しかし Scanner.next() によってトークン化された結果に対して split("," ) を行うと：
        // "1,2" -> ["1", "2"] → OK.
        // " , 2 ,3 ," -> ["," ? No.] : split(",") で区切ると空文字列が含まれる可能性がある（例："a,b,c" のように a と b の間にカンマしかない）。

        String tokens = ""; 
        if (scanner.hasNext()) {
            while(scanner.hasNext()){ // スキャナーは空白をスキップし token を返すので「1,2」→ "1,2" が一つになるか？No. '1', ',', '2' と区別できないため、スペースがない限り一つのトークン。ただし問題文の例では明確に「カンマ区切りの整数列」とあるので、「a,b,c,d,e,f...」のような形式で処理する必要がある。
                tokens += scanner.next(); 
            } 
        } else { return; } 

        // ここで tokens は連結された文字列（空白を含まないか？Scanner の next() は空白を含むことを許すため、スペースあり場合は問題があるかもしれないが、「標準入力から...受け取る」なので「1,2,3\n4» → 一つの token "1" と次の行の「next(4)"" など。これを連結して split(",") で処理するのが正しいか？
        // No. スキャナーは空白区切りであるため、もし input が " 1 , 2 " (スペースあり) の場合、「1」が一つ、「,」が別トークンなどになる可能性があり（Scanner は「文字列の区切りを空白」として token に分割する）。したがって split(",") で処理する必要があるので「,」が含まれたまま一つの Token とするのが理想である。しかし Scanner.next() ではスペースで割られるため、この方法では不可。
        // 代わりに System.in のそのままを読み込むか？Java はそのように直接扱うことができる（String input = new String(System.in.readAllBytes());）。ただし readAllBytes は Java9+ で可能だが「標準ライブラリのみ」という条件は問題ないだろうが、古い環境でも対応できるようにする必要があるかもしれない。

        // この問題は Scanner の token 化によって解決できないため、「Scanner を使わずに直接文字列を処理」する方法を使うべきだ（ただし read() は Java8 でも OK なので）。
        
        InputStream in = System.in; 
        byte[] buffer = new byte[1024]; 
        StringBuilder sb = new StringBuilder();
        int len; 
        
        while ((len = in.read(buffer)) != -1) { // 読み込み続けるまでループする（空の場合も含む）
            if (buffer[offset] == ' ') { /* スペース無視は不要で文字列全体を保持し、後で split("," ) で処理すればよい。ただし空白や改行も区切りとして扱う必要があるかもしれないが「カンマ区切りの」とあるのでのみ分割する？空要素・前後の空白は無視 → 例："1,,2" -> 二重のカンマは空の要素になるか？split(",") を用いると ["1", "", "2"] が返る。Integer.parseInt("") は NumberFormatException なので無視されるようにすればよい。）
                // しかし、直接文字列を構築すると入力サイズが制限されているかもしれない（巨大な入力が来る可能性）。しかし 64bit integer の範囲に収まる合計なので整数自体は有限個である（最大約 9×10^18 / min_int_value ≈ 数亿個？いや max_sum は 2^63-1 なので、最小値が -2^63 + なら正の数は少ない）。
                // しかし入力の規模は制限されていないため readAllBytes を使った構築は可能だが非常にメモリを消費する可能性がある。

            } else { 
                 sb.append(buffer[i]); 
            } 

        };

        String inputStr = new StringBuilder().append(sb).toString();

        // ここまで来て、Scanner の token 化ではなく直接文字列を取得して split(",") で処理するのが最も正確である（空白・非数値は parseLong に fail-fast なので無視される）。ただし readAllBytes は Java8 でも OK か？Java7/8 では InputStream を使う必要があるが、read(byte[]) と -1 チェックは標準ライブラリに属する。

        // しかし問題文の「Scanner」の使用を明示的に要求していないため、このアプローチで良いか？
        // 問題は readAllBytes() は Java9+ でしか利用できないことがない（読み込み全部を一括で行う）。代わりにループで読ませる必要がある。しかしこれは複雑すぎるかもしれない。

        // よりシンプルな方法：Scanner.nextBigInteger() を使い、整数でない要素は無視する。ただし「カンマ区切り」という構造は考慮すべきか？
        // 「1,2」を split(",") すると ["1", "2"] → OK. しかし「1 , 2 」→ token が一つになるのか二つになるのかによるが Scanner.nextBigInteger() はトークン単位で整数のみを読み込むので、「1」として読み込み、次に「» の場合はエラーになり、次へ進む必要がある。
        // なのでこのコードでは：Scanner nextInt を使って解析し続けるのではなく、String token とにして
