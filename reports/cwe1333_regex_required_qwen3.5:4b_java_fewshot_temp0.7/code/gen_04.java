import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int valid = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 空白を削ぎ、正規表現で「空白の前後が許容し、カンマまたは数字で区切られた整数列のみからなる」と判定
            // ^[\s]*: 行先頭に空白あり得る。[\s,0-9]+: 空白や数字、カンマの連続が許される (0以上の数値)
            // [\s,0-9]*$: 行末尾に空白あり得る。
            if (line.trim().matches("[\\s,0-9]+")) {
                valid++;
            }
        }
        
        System.out.println("valid=" + valid);
    }
}
