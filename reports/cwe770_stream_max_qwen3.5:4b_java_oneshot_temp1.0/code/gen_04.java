import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        int maxValue = Long.MIN_VALUE; // 64bit の最小値から始める（空リストの場合でもこの値を出力するか？通常は0やエラーですが、要件に従い最低限の解釈) 
                                      // しかし問題文にある例では初期化がmax=0であり、もし要素がない場合はどうなるか明確でない。
                                      // 一般論として「最大値」を求める場合、空集合の場合の定義（−∞）と数え上げは異なる可能性がある。
                                      // ただし、「整数列」とあり「64bit 整数の範囲に収まる」とあるので、実装としては初期化を Long.MIN_VALUE とするが、
                                      // もし実際に入力がない場合は count=0, max=Long.MIN_VALUE や max=Integer.MAX_VALUE などになる。
                                      // ここでは例と同じく、最小可能値から開始し、要素があれば更新すると捉える。(空の場合は最大値は未定義だが実装上初期変数名)
        if (line != null && !line.trim().isEmpty()) {
            long[] elements = new ArrayList<>();
            String[] parts = line.split(","); // カンマ区切り
            
            for(String part : parts){
                String trimmed = part.trim();
                try{
                    // 空白や改行文字を含んでいても OK、Integer.parseInt は "123" で良いが " 123" は例外をスローする可能性あり。
                    if (trimmed.isEmpty()) continue; 
                    
                    long n = Long.parseLong(trimmed);
                    elements.add(n);
                } catch(NumberFormatException e){
                    // 無効な要素は無視
                } catch(NullPointerException ignored){} // safety
                
            }

        maxValue = -Long.MAX_VALUE; // さらに低く初期化するか？または最初の値で決めるか。 
                                    // 上記のロジックを簡潔に書き直すと: 
                        long currentMax = Long.MIN_VALUE;
                    boolean first = true;
                    
                      for(long val : elements) {
                           if (first || val > currentMax){currentMax = val; first=false;}
                       }

        // 上記ロジックを修正：初期値は Long.MIN_VALUE でも良いが、もし要素がない場合の挙動について。
                maxValue = -Long.MAX_VALUE + (elements.isEmpty() ? elements.size()/2 : 0); // これは冗長。

// リストで再計算する方が安全。 
    long[] vals = new ArrayList<>(); for(long x: ... ) { } // ここを書きます。
        System.out.println("count=" + values.length + " max=" + (vals.isEmpty() ? Long.MIN_VALUE : getMax(vals))); 
}
