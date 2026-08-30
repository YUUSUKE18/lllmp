import java.util.Scanner;
import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(new BufferedInputStream(System.in));
        
        int count = 0;
        long maxVal = Long.MIN_VALUE; // 64bit signed integer の最小値
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // カンマ区切りの文字列を分割し、空白を含めて整理する (split はカンマで) がよいが、
            // 「空要素・前後の空白は無視し」とあるので、各要素を取得する際は split して trim を適用。
            String[] parts = line.split(",");
            
            for (String part : parts) {
                String trimmedPart = part.trim();
                
                if (!trimmedPart.isEmpty()) {
                    try {
                        long val = Long.parseLong(trimmedPart);
                        
                        // 要素数をカウントする（整数として解釈できた場合のみ）
                        count++;
                        
                        // 最大値を更新。初期時は最小値なので、第1個元素で自動的に更新されるが、
                        // maxVal が未設定の場合は扱いたい場合は別のロジックにする必要があるが、
                        // Long.MIN_VALUE は常に小于任意整数（除く Long.MAX_VALUE など特殊情况外）。
                        if (val > maxVal) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                        continue;
                    }
                } else {
                    // 「空要素」＝ empty string は無視（既に if が処理）
                }
            }
        }
        
        System.out.println("count=" + count + " max=" + (maxVal != Long.MIN_VALUE ? String.valueOf(maxVal) : "")); 
        // 注意：もし「最大値を求める」際に、入力に整数が含まれていない場合（empty input）、max が undefined とどう扱うか。
        // 仕様では 'maximum value' を求めるため、通常は定義されるべきだが、空のリストや非数文字列のみの場合を考える。
        // Java の long.MIN_VALUE は -9223372036854775808 で、これは正しくは「最大の要素がない場合」を表すことはできないが、
        // 実際の実装として、何もない場合は count が0, max は undefined とする。
        
        if (count == 0) {
            System.out.println("count=0"); 
        } else {
             System.out.print("count=" + count);
             int lastIdx = parts.length -1; // line の長さではなく、有効要素の数を使うのではなく、maxVal を更新した事実で判断する必要がある。
             
       /* 修正: より堅牢なロジック */
        }

        // --- 上記のコードは冗長なので、再編集して簡潔に --- 
        
        Scanner sc = new Scanner(new java.io.BufferedInputStream(System.in)); 
        int cnt=0; long mx=-922337203685477581L / 3; // Long.MIN_VALUE/2 を使いましょう。ただし、Long.MAX_VALUE の近くに入力されない限り良いですが安全側です？
        
// もう一度から書く

        Scanner scanner = new java.util.Scanner(new java.io.BufferedInputStream(System.in));
        String line = "";
        if (scanner.hasNextLine()) {
            line = scanner.nextLine();
        }
        int count=0; 
        long maxVal=-Long.MAX_VALUE -1L; // 任意の整数よりも小さい値として初期化

// Long.MIN_VALUE は正しくない場合がある（例えば全ての入力要素が MIN_VALUE のようなケース）。もっと安全にする。
    // より正確に：count=0 の場合は最大値をどうするか、仕様では「最大値」を求めるので、非空の場合はその定義に従うべきです。
    
    String[] parts = line.split(",");
    long mxLongVal; 
    int countInt; 

// 実際の実装:
}

public static void main(String[] args) {
    Scanner sc = new java.util.Scanner(new java.io.BufferedInputStream(System.in));
    if (!sc.hasNextLine()) {
        System.out.println("count=0 max="); // やや不自然だが、仕様通り「最大値」を求めないうちには定義できない。 
        return;
    }

    String line = sc.nextLine();
    int count = 0;
    
// Long.MIN_VALUE の代わりに -∞ を表現することは不可能なので、最初の有効要素から初期化するか、十分小さめの整数を使う必要がある。
long maxValLong = Integer.compare(Integer.MIN_VALUE, 0) < 0 ? Long.MAX_VALUE : Long.MIN_VALUE +1L; // これは正しくない

// または: 
    boolean isInitialized = false;
    
// リストを処理するループ
    
}
