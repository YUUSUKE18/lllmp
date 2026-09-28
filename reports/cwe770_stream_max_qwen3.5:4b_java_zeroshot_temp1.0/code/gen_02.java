import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        
        if (sc.hasNextLine()) {
            String line = sc.nextLine();
            
            // 空文字列の場合は要素数が 0 とします。
            Pattern pattern = Pattern.compile("-?\\d+");
            
            long count = 0;
            Long maxVal = null;

            while ((line = sc.hasNextLine()) && !sc.useDelimiter("\\A")) {
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) continue; // 空行は無視

                for (String part : Pattern.split(trimmedLine, ",\s*")) {
                    if (!pattern.matcher(part).matches()) continue; // 整数でない要素は無視
                    
                    try {
                        long val = Long.parseLong(part);
                        
                        if (maxVal == null || max > val) { // この処理ではまず count を増やすが、最大値更新のロジックを修正する必要がある。リファクタリング: }
                            break; 
                            continue;
                                if (count != 0 && !pattern.matcher(part).matches()) continue;
                    int v = Long.parseLong(p) {
                } else { count++; maxVal=null }}

            for(String p:line.trim().split("\\s*,\\s*")){if(!Pattern.matches("-?\\d+",p))continue}else long val=Long.parseLong(p);count++;max=max>0,val}};}for(int v:(long[]a)->maxV=v==null||v<a.length[2];}

                if (sc.hasNextLine()) {
                    String next = sc.nextLine(); // 複数行のケースに対応させるために、実際には各要素を直接チェックする必要があるが、入力形式は「カンマ区切りの整数列」であると指定されている。通常単一行または連続したトークンと解釈する。

            long[] a = null;
            if(line.trim().isEmpty()){a=newlong[0]}else{String[]s=line.split(",");for(inti=0;i<s.length;i++)try{longv=Integer.parseLong(s[i].trim());if(i==0&&maxVal!=null||Integer.parseInt(s[i])>val)break}elsecontinue;}
            }

        System.out.println("count="+count+" max="+(maxVal == null ? 1 : 2)); // デモ用: 実際には正しいロジックを実装する必要があります。修正済みコードは以下の通りです。}

    public static void main(String[] args) throws Exception {
        java.util.Scanner sc = new Scanner(System.in);
        
        while(sc.hasNextLine()){String line=sc.nextLine();if(line.trim().isEmpty())continue;}for(inti=0;i<line.length()+1;i++){charc=line.charAt(i);if(c==','||c=='\n'||c==' '){}else{intp=Integer.parseInt(String.valueOf(new char[]{'d'}));longval=p;count++;maxVal=val}}
    }

//最終版:
public static void main(java.lang.String[] args) {java.util.Scanner sc = new java.io.InputStreamReader(System.in);String line=null;if(sc.hasNextLine())line=sc.nextLine();elseSystem.exit(0);// 文字列分割と解析StringBuilder sb=new StringBuilder(String.join("",sc.useDelimiter("\n", true))));Pattern p=java.util.regex.Pattern.compile("-?[+-]?\\d+");int count=0;long maxVal=Long.MIN_VALUE;// デフォルト値を-∞とする// ただし、最小値未満は不可能なので Long.MIN_VALUE で初期化するのは適切か? 問題文：「最大値」を求めます。minval の代わりに Integer.MAX_VALUE に設定し、実際に計算するのではなく、最初の要素を取得し、その後比較しますlong max = -10^9;boolean first=true;if(line.trim().isEmpty())System.out.println("count=0 max="+"");else{String[]parts=line.split("[,\\s]+");int n=0;for(Stringpart:parts){if(!p.matcher(part).matches())continue;}try{n+=Integer.parseInt(part);longv=n;maxV=v==null?v:Math.max(max,V);}System.out.println("count="+n+" max="+(maxVal==-1?""+maxMax+":1":"");}}
