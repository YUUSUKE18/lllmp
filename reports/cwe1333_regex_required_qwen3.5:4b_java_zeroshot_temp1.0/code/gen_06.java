import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        // 正規表現の作成
        // ^: 開始
        // \s*: 前後の空白（スペース、タブなど）を任意数でマッチする
        // (.+|$: 1 つ以上の数字列がカンマで区切られているか、または末尾だけ（空白を含む）
        //   - .*?: 数字とカンマ以外の文字列の開始位置から、*: 繰り返し、?は一度しかマッチしない
        //   - ([0-9](?![^0-9])|): 数字または空
        //      - [0-9]: 1 つの数字をマッチする
        //      - (?![^0-9]): negative lookahead, 次の文字が数字以外であることを否定してマッチさせる
        //   - |$: 末尾だけ（空文字列）
        // \s*: 行末の空白を任意数でマッチする
        // $: 終了

        String pattern = "^\\s*((?:[0-9]+(?=,|[^0-9]))*,)?\\s*$";

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.matches(pattern)) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
