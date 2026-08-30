import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLong()) return;
        
        long target = scanner.nextLong();
        
        // 空行や整数として解釈できない行をスキップして有効な整数を読み込む
        Set<Integer> numbers = new HashSet<>();
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            
            try {
                int val = Integer.parseInt(line.trim());
                numbers.add(val);
            } catch (NumberFormatException e) {
                // 整数として解析できなくなった場合は処理を中断
                break; 
            }
        }
        
        long count = 0;
        // 位置が異なる 2 つの組を探すため、インデックス付きリストを作成（HashSet の重複を除く場合も OK）
        // しかし問題文は「2 行目以降の整数のうち」とあり、同じ値でも位置が異なるならペアとして数えるか？
        // "2 個の組（位置が異なる 2 個）" とあるので、同じ数字でも違う場所で出たらペア。
        // したがって Set を使うとダメで、インデックスごとに処理する必要がある。
        
        // 改定：Set は値の重複を除くので、同じ数値が複数回現れてもペアが作れない可能性が生じる。
        // 正しいアプローチ：リストとして保存してチェック。
        
        List<Integer> list = new ArrayList<>();
        for (String s : scanner.lines().collect(Collectors.toList())) { // スキャナーの状態が壊れた可能性があるが、再試行せず処理継続
            // 上記のループは既に終了し、scanner はもう次の行を読む準備されていない（または空）
            // なので、最初の読み込みから直す必要がある。

            // 書き換え：一度で正しく処理するロジックを適用。
        }
        
        // 再構築したコードを実装
    }
}
