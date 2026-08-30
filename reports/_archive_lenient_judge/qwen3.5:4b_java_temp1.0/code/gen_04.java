import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long sum = 0L;
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                int value = Integer.parseInt(token.trim());
                // 重複を除くための Set の利用。ただし、個数を正しくカウントするために Map を使用すると効率的であるが、
                // シンプルかつ要件を満たすために HashSet に数えるか、Set を使って唯一のものだけ合計を足し込むアプローチを採用する。
                // しかし、「重複を除いた整数」の「個数」と「合計」を求めるので、まずは Set でユニークな要素を取得し、その上で集計する必要がある。
                
                // 一度に処理するために、全入力を先読みしてセットに入れるのが最もシンプルだが、ストリーミングでも可能。
            } catch (NumberFormatException e) {
                sc.next(); // 無効な文字列をスキップ
            }
        }
        
        // 上記のロジックは不完全であるため、より確実なアプローチに変更する:
        // システム入出力全体を読み込み、整数に切り出されたものを処理する。ただし Scanner はストリームなので、
        // ここでは Java8 の Stream API を使うことでセットに入力し直す必要があるが、Scannerの構造上は難しい。
        
        /* 修正版ロジック: */
    }

    public static void main2(String[] tokens) {
        long sum = 0L;
        java.util.HashSet<Integer> set = new java.util.HashSet<>();
        for (String token : tokens) {
            try {
                int val = Integer.parseInt(token.trim()); // Java の標準的な整数解析は Long.MAX_VALUE を超えることはないので、Integer に変換する必要があるが、問題文では 64bit integer なので long で扱うべきか？"合計は 64bit 整数の範囲に収まります"
                if (val == val) { // NaN チェック不需要，ただ冗長
                    int i = Integer.parseInt(token.trim()); 
                    sum += i;
                    set.add(i);
                }
            } catch(Exception e){}
        }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        java.util.HashSet<Long> uniqueNumbers = new java.util.HashSet<>();
        while (sc.hasNext()) {
            String token = sc.next();
            if (!token.isEmpty() && !Character.isWhitespace(token.charAt(0))) { // 空白チェックは trim を使うと簡単だが、次々入力されるので...
                try {
                    long value = Long.parseLong(token.trim());
                    uniqueNumbers.add(value);
                } catch (NumberFormatException e) {
                    sc.next(); // 文字列が無効な場合をスキップ
                }
            } else if (sc.hasNext()) { 
                 continue;
        }

    public static void main(String[] args) throws Exception{
        java.util.Scanner sc = new java.util.Scanner(System.in);
        long sum = 0L;
        
        // トークン化して処理する。Scanner は自然にトークンを分割してくれるが、空白や改行区切りで自動的に扱われるので、
        // try-catch で整数パースを行い、重複をチェックしながら加算していく方法を採用しない方が複雑になるため、
        // 全入力をセットに入れるアプローチとする（メモリ使用量が小さい場合を除く）。

        java.util.Set<Long> set = new java.util.HashSet<>();
        
        while(sc.hasNext()){ 
            String token=sc.next(); 
            try{ 
                long num=Long.parseLong(token.trim()); 
                set.add(num); 
                // 一旦セットに入れてから後で合計を出すのではなく、直後に個数も集計するには...
            } catch(Exception e){} 
        } 
        
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in).useDelimiter("\\s*");
        
        java.util.Map<Long, Integer> countMap = new java.util.HashMap<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty()) { // 空白文字のみをスキップ（Scanner はデフォルトで空行や空白区切りを跳躍するが、安全策）
                try {
                    long num = Long.parseLong(token);
                    countMap.put(num, countMap.getOrDefault(num, 0) + 1);
                    
                    // ここで直ちに合計を更新することも可能だが、「重複を除いた整数」の個数とは？
                    // 「それぞれについて（各一意の数値につき）」 -> これは Map の value が個数を保持していることになるが、
                    // しかし仕様は「『重複を除いた整数』について 1 つ」という意味で解釈すべきか？ 
                    
                } catch (Exception e) {
                }
            } else if (!scanner.hasNext()) break; 
        }

    /* よりシンプルかつ正確な実装を再構成: */
    
        java.util.Scanner sc = new Scanner(System.in);
        long sum = 0L;
        
        // 各数値の出現回数をカウントせず、「重複を除いたもの」について「個数」と「合計」を求める。
        // つまり、ユニークな要素の数とそれらの和を出力する必要がある。

    java.util.Set<Long> uniqueSet = new java.util.HashSet<>();
    
    while (sc.hasNext()) { 
        String token = sc.next().trim();
        if (!token.isEmpty() && Character.isDigit(token.charAt(0)) || isNegativeIntegerString(token.trim())){ // 負の数字も扱う必要がある。isNegativeIntegerString は冗長なので簡素化する
             try {
                 long n = Long.parseLong(token); 
                 uniqueSet.add(n); 
             } catch(Exception e){} 
        } else if (sc.hasNext()) continue; // ただし sc.next() が空白文字列をスキャンし続けるので...
        
    /* 最終的な簡潔な実装: */
    
        java.util.Scanner sc = new Scanner(System.in).useDelimiter("[\\s]+");
        long sumVal = 0L;
        int uniqueCount = 0;

        // シンプルに文字列を全て読み込むのではなく、Scanner の次々入力を利用する。
        
    }
