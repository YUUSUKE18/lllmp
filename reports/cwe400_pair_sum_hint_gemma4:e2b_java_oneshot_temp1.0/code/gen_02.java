import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        String line;
        
        // 2行目以降の数値を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                // 行ごとにスペース区切りで複数の数を読み込む
                String[] parts = trimmedLine.split("\\s+");
                for (String part : parts) {
                    if (!part.isEmpty()) {
                        numbers.add(Long.parseLong(part));
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 読み込んだ数値をソートする（2つの組を探すために効率化するため）
        // 読み込んだデータが「行ごとに1個ずつ」並んでいるという指示に基づき、
        // 実際には読み込んだすべての整数をリストに格納し、そこからペアを探す。
        // 課題の解釈として、「2行目以降の整数が1行に1個ずつ並ぶ」ことから、
        // 2行目以降の各行を個々の整数として扱うのが最も自然である。
        // しかし、例題の形式と、この問題の一般的な構造を考慮すると、
        // 入力は「目標値」の後に「整数列」が続く、という構造が想定される。
        // ここでは、すべての読み取った整数を一つのリストに集め、そこからペアを探す。
        
        // もし入力が「目標値\n数1\n数2\n...」という形式であれば、
        // 2行目以降の各行が1つの整数（または複数の整数）を表す。
        
        // 仕様「2行目以降には整数が 1 行に 1 個ずつ並びます」を、
        // 標準入力の各行が1つの整数を表すと解釈し直す。
        // (例1の形式と照らし合わせると、これは誤解を生む可能性があるため、
        // ここでは「読み込んだ全ての整数」からペアを探す標準的な解法を採用する。)

        // 再度読み込み、2行目以降を個々の整数として扱うように修正する。
        // 最初のreadLine()でターゲットを読み込んだ後、残りの行を整数として扱う。

        // 読み込み直しのロジック（より厳密に「1行に1個ずつ」に対応）
        
        // すべての整数を再収集する（再読み込みは困難なので、最初の読み込みを信じる）
        // 最初の読み込みが目標値のみで、残りがデータである、という前提で、
        // 2行目以降のデータがすべて続くものとする。

        // 読み込んだnumbersリストに含まれる値から、足してtargetになるペアを探す。
        // これは、入力された数全体が、ターゲットとの和を考えるための候補セットであると解釈する。

        long count = 0;
        int n = numbers.size();

        // 2つのポインタ (または2つのリスト) を使う方法が効率的だが、
        // ここでは単純に2つの要素でループする。O(N^2)だが、Nが実用的であれば許容される。
        // 敵対的な大きな入力に対しても実用的な時間が必要なため、ハッシュマップまたはソート+2ポインタを用いる。

        // ソートして2ポインタ法 (O(N log N))
        // numbers.sort(null); // ArrayListなのでsortメソッドを使用

        // 2ポインタ法によるペア検索
        // (もし入力が1行に1個ずつ並ぶなら、それは一つの配列になるはず)
        
        // 提示された入力形式の曖昧さを解消するため、もし入力が以下のような構造を意味すると仮定する:
        // Line 1: T (目標値)
        // Line 2: a1 a2 a3 ... (整数列)
        // Line 3: (次のデータ、または空行)
        
        // この解釈に基づき、上記で収集したnumbersリストからペアを探す。
        // 2つの異なる位置の要素を探す。

        // 1. ソート
        numbers.sort(null);

        // 2. 2ポインタ法でペアを数える
        int left = 0;
        int right = n - 1;
        long pairs = 0;

        while (left < right) {
            long sum = numbers.get(left) + numbers.get(right);
            if (sum == target) {
                // ターゲットが足し算で得られた場合
                pairs++;
                // 同じ値が複数ある場合、内側の値もペアとして数える必要があるが、
                // 問題文は「2個の組（位置が異なる2個）」を求めているため、
                // 同じ値が複数ある場合は注意が必要。
                
                // ここでは、同じ値を持つ要素が複数存在する場合の扱いを考慮する。
                // 例: T=10, {5, 5, 5}。 (5_1, 5_2) が1組。
                // 2ポインタ法では、leftとrightが指す要素が異なる位置を指しているので、
                // このままカウントする。
                
                // 同じ値の重複を考慮する場合、要素を一つずつ進める必要がある。
                long leftVal = numbers.get(left);
                long rightVal = numbers.get(right);
                
                // leftとrightが同じ値を持つ場合、それらは異なる位置なのでペアとなる。
                // 例えば {5, 5, 10} T=10。 left=0(5), right=1(5)。 sum=10。 1組。
                // 2ポインタ法では、numbers.get(left) != numbers.get(right) の場合のみ、
                // その組み合わせを数えるのが一般的だが、ここでは「位置が異なる2個」なので、
                // 左ポインタと右ポインタが指すインデックスが異なれば良い。
                
                // 2ポインタ法を適用し、同じ値が隣接して存在する場合の重複カウントを避ける必要がある。
                
                // ここでは、値が異なる限り、左をインクリメントし、右をデクリメントする。
                if (leftVal != rightVal) {
                    // 異なる値のペアが見つかった。
                    // leftの値をそのままカウントし、次の異なる値を探す。
                    
                    // 同じ値の連続をスキップ
                    int currentLeft = left;
                    while (currentLeft < right && numbers.get(currentLeft).equals(leftVal)) {
                        currentLeft++;
                    }
                    
                    int currentRight = right;
                    while (currentRight > currentLeft && numbers.get(currentRight).equals(rightVal)) {
                        currentRight--;
                    }
                    
                    // 実際にペアになった数をカウントし、ポインタを更新
                    pairs += (currentLeft - left) * (right - currentRight);
                    left = currentLeft;
                    right = currentRight;
                    
                } else {
                    // 左と右が同じ値の場合 (sum == 2 * X)
                    // 連続する同じ値の数を数える
                    pairs += (right - left);
                    left = right; // ループ終了
                }
                
            } else if (sum < target) {
                left++;
            } else { // sum > target
                right--;
            }
        }
        
        // 簡略化のため、より堅牢なハッシュマップによる解法を採用する。（O(N)）
        
        java.util.HashMap<Long, Integer> freq = new java.util.HashMap<>();
        for (long num : numbers) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        
        pairs = 0;
        for (long num1 : freq.keySet()) {
            long num2 = target - num1;
            if (freq.containsKey(num2)) {
                if (num1 < num2) {
                    // num1とnum2が異なる場合、組み合わせの数を計算する
                    // (num1の出現回数) * (num2の出現回数)
                    pairs += freq.get(num1) * freq.get(num2);
                } else if (num1 == num2) {
                    // num1 == num2 の場合 (2 * num1 = target)
                    // 同じ値が2つ以上存在する場合、組み合わせの数を計算する: nC2 = n * (n-1) / 2
                    int n = freq.get(num1);
                    pairs += (long)n * (n - 1) / 2;
                }
            }
        }


        System.out.println("pairs=" + pairs);
    }
}
