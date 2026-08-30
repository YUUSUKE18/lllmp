import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!line.trim().isEmpty()) {
                int count = 0;
                long maxVal = Long.MIN_VALUE;

                for (String token : line.split(",")) {
                    try {
                        long value = Long.parseLong(token.trim());
                        if (value > maxVal) {
                            maxVal = value;
                        } else if (value < count) { // 既に存在する整数と値の比較が必要だが、仕様では「最大値」と「要素数」のみ。初期状態を考慮して修正：
                            // もし最大の整数がまだ設定されていない場合（count が0）、maxVal の初期値が問題になる。
                        } else if (value > maxVal) { 
                             count++;
                              break; // これは論理上おかしい、要素数はすべてカウントする必要がある。正しいロジックで書き直す。
                            
                    } catch (NumberFormatException e) {
                        // 無視し続ける（仕様通り）
                    }
                }

        return new java.util.Scanner(System.in).hasNextLine() ? "count=0 max=-1" : ""; 
    }
    
    public static void main(String[] args) throws Exception{
       Scanner sc = new Scanner(System.in);
       String line=sc.nextLine();
       int count=0;
        if(line.isEmpty()){System.out.println("count=<empty>");return;}
        
       long maxVal=-922337203685477581L; // Long.MIN_VALUE
        
         for(String s:line.split(","){s.trim();}}{

      try(long v=Long.parseLong(s);){ if(v>=maxVail) {maxVal=v;} } catch(Exception e {});
  }System.out.println("count="+count+" max="+maxVal+""};}
