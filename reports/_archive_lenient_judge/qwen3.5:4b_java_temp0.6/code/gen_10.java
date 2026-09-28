import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        // 空白を切り取り、空文字列で分割し、有効な整数のみのリストを作成する
        BigInteger[] uniqueIntegers = new BigInteger[1]; 
        int count = 0;
        
        try {
            for (String token : line.split(",")) {
                String trimmedToken = token.trim();
                if (!trimmedToken.isEmpty()) {
                    // 有効な整数に変換できるか確認する（ただし、仕様上は「解釈できない要素も無視」とあるので、NumberFormatException をキャッチ）
                    try {
                        BigInteger num = new BigInteger(trimmedToken);
                        
                        // 重複チェックとカウントアップを同時に行うために、HashMap で管理しなくてもよいが、簡潔に ArrayDeque か Set などを使うか。
                        // しかし、仕様は「個数」と「合計」のみなので、一度読み込むだけで OK.
                        // ただし、「重複を除いた整数」の個数を求める必要があるため、Set が必要。
                        
                    } catch (NumberFormatException e) {
                        continue; 
                    }
                }
            }
        } finally {
            scanner.close();
        }

        // 上記ロジックを再構築：集合を使って重複を除く処理を行うためにシンプルに直列化し、Set で管理する。
    } 

}
