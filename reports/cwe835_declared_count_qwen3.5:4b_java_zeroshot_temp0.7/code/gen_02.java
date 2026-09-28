import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long sum = 0;
        
        // 1 行目：整数の個数を読み取る（ただし、実際に存在する個数に合わせるため、この値は利用せず）
        if (scanner.hasNextInt()) {
            scanner.nextInt();
        }
        
        // 2 行目以降：整数を 1 行に 1 個ずつ読み込む
        while (scanner.hasNextLong()) {
            long value = scanner.nextLong();
            sum += value;
            count++;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
