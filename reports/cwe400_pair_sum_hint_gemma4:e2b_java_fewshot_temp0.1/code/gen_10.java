import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());
        
        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降を読み込み、整数を収集
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                // 複数の整数が1行に並ぶ可能性があるため、スペースで分割して処理
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
        
        // 2個の組の数を計算
        long count = 0;
        int n = numbers.size();
        
        // 2つの要素 a と b が target になる条件は a + b = target
        // 2つの組 (i, j) で i != j を探す。
        // 効率的に数え上げるため、ハッシュセット（または配列）を使う。
        
        // 2つの要素のペアを数えるため、各要素の出現回数を数える
        // 実際には、同じ値が複数回出現する場合の組み合わせを考慮する必要がある。
        // 問題文の「2個の組（位置が異なる 2 個）の個数」は、インデックス i と j (i != j) のペアを数えることを意味する。
        
        // 座標 (インデックス) を保持して、どの値がどの位置にあるかを考慮する
        List<Long> indexedNumbers = new ArrayList<>();
        int index = 0;
        
        // 再度入力ストリームを処理し、インデックスを保持する
        // 最初の行は既に読み取ったので、残りの行を再処理する必要があるが、
        // 入力形式が「1行目に目標値、2行目以降に整数が1行に1個ずつ並ぶ」という記述から、
        // 2行目以降の各行が1つの整数を表す、またはスペース区切りの整数列全体が続く、と解釈する。
        // 例1, 2, 3の例から、入力は「目標値」の後に続く「整数列」が続く形式と解釈する。
        // 課題の記述「2 行目以降には整数が 1 行に 1 個ずつ並びます」を厳密に解釈すると、
        // 2行目以降の各行が1つの整数であると考えるのが自然。
        
        // 再度、入力処理をシンプルにするため、全ての整数をリストに格納する。
        // 最初の行は目標値。それ以降の行がデータ。
        
        List<Long> allNumbers = new ArrayList<>();
        
        // 再度、入力ストリームを読み直す（ここでは再読み込みができないため、最初の読み込み結果を再利用する）
        // 最初の読み込みで読み込んだデータが、目標値とそれに続くデータであると仮定する。
        
        // 最初の読み込みで読み込んだデータ（numbersリスト）が、目標値以降のデータであると仮定する。
        // 最初の行が目標値、2行目以降がデータ。
        
        // 最初の読み込みで読み込んだ numbers リストには、2行目以降のデータが含まれているはず。
        // numbers = [data_2, data_3, ...]
        
        // 2つの組 (i, j) で i != j を数える。
        // numbers リストの要素 a と b が a + b = target となるペアを数える。
        
        // 2つの要素 a, b が target になるペアを数える。
        // 1. 異なるインデックス i, j について a[i] + a[j] = target
        // 2. 同じインデックス i について、a[i] + a[i] = target (これは i != j の条件を満たさないため除外)
        
        // 座標を保持したリストを再構築する
        List<Long> indexedData = new ArrayList<>();
        int currentIdx = 0;
        
        // 最初の行は目標値。2行目以降をデータとする。
        // 最初の読み込みで読み込んだ numbers リストが、2行目以降のデータであると仮定する。
        // 最初の行が目標値なので、numbers リストの要素はインデックス 0 から始まるデータに対応する。
        
        for (long num : numbers) {
            indexedData.add(num);
        }
        
        // indexedData の要素の数 N = numbers.size()
        int N = indexedData.size();
        count = 0;
        
        // O(N^2) で全ペアをチェックする（Nが実用的な範囲であれば許容される）
        for (int i = 0; i < N; i++) {
            for (int j = i + 1; j < N; j++) {
                if (indexedData.get(i) + indexedData.get(j) == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
