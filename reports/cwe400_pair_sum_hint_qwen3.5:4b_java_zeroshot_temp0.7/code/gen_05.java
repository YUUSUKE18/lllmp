import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値の読み込み (空行をスキップ)
        String targetLine = reader.readLine();
        while (targetLine != null && targetLine.trim().isEmpty()) {
            targetLine = reader.readLine();
        }
        
        if (targetLine == null) {
            return;
        }

        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            return;
        }

        // 入力数値のリスト (空行や非整数行はスキップ)
        List<Long> numbers = new ArrayList<>();
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        if (numbers.size() < 2) {
            System.out.println("pairs=0");
            return;
        }

        long count = 0;
        
        // 単純な 2 重ループでペアを探す方法
        // N が 10^5 程度であれば O(N^2) は時間制限を超えすぎる可能性があるが、
        // 問題文の「実用的な時間」という条件と「64bit 整数」を考慮すると、
        // 典型的なアルゴリズム問題としては N <= 10^5 の場合、ハッシュセットを用いた O(N) が適切。
        // しかし、Java の HashSet は初期化や衝突に overhead が発生し、非常に大きな入力 (N=2*10^5+) でメモリ制限を超える可能性もある。
        // 最も安定した実装は並べ替え + 二重ループだが、O(N log N) で安全である。
        
        // ただし、問題文の「敵対的に大きな入力」を考慮し、かつ「標準ライブラリのみ」という制約下で、
        // メモリ効率も重視する。HashSet を使うのが最も一般的で高速（平均 O(N)）。
        // 64bit 整数範囲内では Long は対応可能である。
        
        Set<Long> seen = new HashSet<>();
        for (int i = 0; i < numbers.size(); i++) {
            long current = numbers.get(i);
            long complement = targetValue - current;
            
            // 既に存在する値の中で、complement を見つける
            // ここでは「2 個の組」を数えるため、seen に保存されているものとのペアとしてカウントする。
            // ただし、同じ値が複数回現れる場合でも、位置が異なる 2 つであれば OK なので、
            // 同じインデックスで同じ値を見つけた場合は別物と扱う必要があるか？
            // 仕様は「位置が異なる 2 個」なので、同じ値でも位置が異なれば OK。
            // seen に保存する際は、現在の数値をセットに加える前に、セットに存在するか確認する。
            
            if (seen.contains(complement)) {
                count += seen.size(); // この瞬間、set にある全ての値が current とペアになる
            }
            seen.add(current);
        }
        
        System.out.println("pairs=" + count);
    }
}
