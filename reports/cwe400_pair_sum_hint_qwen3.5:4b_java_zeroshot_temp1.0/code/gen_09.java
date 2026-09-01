import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seen = new HashSet<>();
        long count = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            // 空行や整数が解析できない行をスキップ
            if (line.trim().isEmpty() || !isInteger(line)) {
                continue;
            }

            // 単一の整数としてのみ処理し、複数値が含まれていても最初のものを採用（仕様は"1 行に 1 個ずつ並びます"）
            try {
                long val = Long.parseLong(line.trim());
                
                // 目標値 - val を set に既に存在するかチェック
                if (seen.contains(target - val)) {
                    count++;
                }
                
                // 現在の数値を追加（注意：同一数値多次元でもペアが形成されるため、セットに値そのものではなくインデックス概念が必要だが、問題文は"組の個数"なので重複する数字でもペアとれるかどうかが重要。
                // ただし Java の Set は値での判別なので、同じ数字 multiple 回登場する場合、その数字を target とした際の (target-val) が既に存在するかでカウントされる。
                // 例えば target=4, val=2. set に 2 があればペア。次に 2 が来た時も set に 2 があるためペア。
                // つまり同じ値 multiple 回登場しても、それぞれの出現が (seen 中存在する相補数) を満たすごとにカウントされる。
                seen.add(val);
            } catch (NumberFormatException e) {
                // 処理途中でも整数でない行は無視
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }

    private static boolean isInteger(String line) {
        try {
            Long.parseLong(line.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
