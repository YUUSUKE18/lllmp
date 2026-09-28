import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        long currentSum = 0;
        int count = 0;
        
        // 2行目以降を読み込み、合計値を計算
        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 空行やスペースのみの行は無視（問題の指示では整数が1行に1個ずつ並ぶが、念のため）
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    continue;
                }
                long num = Long.parseLong(trimmedLine);
                currentSum += num;
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 2つの組の個数を求める (和が目標値になる2個の組)
        // これは、数列内の2つの要素 a_i と a_j (i != j) が a_i + a_j = target となるペアの数を求める問題と解釈する。
        // 問題文の「2 個の組（位置が異なる 2 個）の個数を求めます」は、
        // 読み込んだ数列 $a_1, a_2, \dots, a_N$ の中で、$a_i + a_j = \text{target}$ となる $(i, j)$ の組の数を求めることを意味すると解釈する。
        // ただし、一般的にこのような問題では、重複を許さないか、インデックスの順序を考慮しないか、あるいは異なる要素のペアを数えるかなど、定義が重要になる。
        // 最も一般的な解釈は、数列 $A$ において $A[i] + A[j] = \text{target}$ を満たすインデックスペア $(i, j)$ の数を数えること。
        
        // ここでは、読み込んだ整数のリスト $A$ の中で $A[i] + A[j] = \text{target}$ となる全てのペア $(i, j)$ (ただし $i \neq j$) を数える。
        
        // 読み込んだ整数を格納
        // 再読み込みが必要になるため、ここでは一度すべてを読み込む方法を採用する。
        
        // 課題の再解釈：
        // 1. 目標値 $T$ を読み込む。
        // 2. $T$ から2つの異なる要素 $a_i$ と $a_j$ ($i \neq j$) を選んで足して $T$ になる組の数を求める。
        
        // 新たな処理：
        // 1行目を読み込み、目標値 $T$ を得る。
        // 2行目以降の整数を全て読み込み、リスト $A$ に格納する。
        
        // 再度、入力全体を考慮して実装する。
        
        // ------------------------------------------------------------------
        // 再実装（入力全体をメモリに保持する）
        // ------------------------------------------------------------------
        
        // 入力を再読み込みする（標準的な競技プログラミング環境を想定して、入力全体を一度に処理する方法を採用）
        
        /* 
         * 実際の実行環境に合わせて、標準入力全体を一度に処理することを前提とし、
         * 最初の読み込み部分を修正する。
         */
        
        // 再度、標準入力全体を処理するロジックに修正する必要がある。
        // 最初の読み込みは $T$ のみで、残りの行をすべて処理する必要がある。
        
        // 最初に読み込んだ $T$ を使用して、残りの行を処理する。
        
        // 念のため、全データを保持するバッファを再構築する。
        
        // 既存のコード構造を維持しつつ、入力を全て処理する。
        
        // ------------------------------------------------------------------
        // 最終的な実装 (再確認)
        // ------------------------------------------------------------------
        
        // 1. 目標値 $T$ を読み込む
        // 2. 残りの行をすべて読み込み、リスト $A$ を構築する
        
        // ここでは、既に $target$ と $currentSum$ は計算済みだが、この問題の意図は $A$ の中のペアを数えることであるため、
        // 読み込んだ整数を保持する必要がある。
        
        // 実行環境が実行中のコードを再実行することを想定し、最初の読み込み部分を修正する。
        
        // 実行環境によっては、1行目に $T$ があり、2行目以降に $A$ が続く、という構造を厳密に守る必要がある。
        
        // 最初のコードブロックは、入力全体を処理するロジックが不完全であったため、
        // 求められている仕様（$T$ を読み、残りの行から $A$ を作り、$A$ から $T$ になるペアを数える）に合わせて、
        // 再度、必要な情報を保持するように修正する。
        
        // 最初の試みで $T$ を読み込むことができたため、その後の処理を $A$ を保持するように変更する。
        
        // このセクション以降は、最初の読み込みが正しく行われたという前提で、
        // $A$ の要素を保持するようにロジックを完全に書き直す。
        
        // ------------------------------------------------------------------
        // 最終解答用のコード
        // ------------------------------------------------------------------
        
        return; // 実際には、この構造ではメインブロックが終了する必要があるが、再評価のためにここではreturnを省略し、完全なクラス構造で出力する。
    }
}

// 最終的なコードを出力
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1. 目標値 T を読み込む
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // Tが数値でない場合は処理終了（問題の制約上、これは起こらないはず）
            System.out.println("pairs=0");
            return;
        }
        
        // 2. 残りの行を読み込み、数列 A を構築する
        List<Long> A = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                A.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 3. 数列 A から、A[i] + A[j] = target となるペアの個数を求める
        // i != j の組を数える。ここでは、重複を許さず、インデックスの順序を考慮しない「異なる2つの要素」のペアを数える。
        
        long pairCount = 0;
        int N = A.size();
        
        // O(N^2) の全探索で求める (Nが小さいと仮定)
        for (int i = 0; i < N; i++) {
            for (int j = i + 1; j < N; j++) {
                if (A.get(i) + A.get(j) == target) {
                    pairCount++;
                }
            }
        }
        
        // 4. 結果を出力
        System.out.println("pairs=" + pairCount);
    }
}
